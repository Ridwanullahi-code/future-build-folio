-- Create user roles system for blog admin
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable Row Level Security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Update blog_posts table to support admin operations
ALTER TABLE public.blog_posts ADD COLUMN author_id UUID REFERENCES auth.users(id);

-- Add new RLS policies for blog_posts
DROP POLICY IF EXISTS "Published posts are publicly readable" ON public.blog_posts;

-- Public can read published posts
CREATE POLICY "Published posts are publicly readable" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Admins can do everything with blog posts
CREATE POLICY "Admins can manage all blog posts" 
ON public.blog_posts 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add categories table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for categories
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Public can read categories
CREATE POLICY "Categories are publicly readable" 
ON public.blog_categories 
FOR SELECT 
USING (true);

-- Admins can manage categories
CREATE POLICY "Admins can manage categories" 
ON public.blog_categories 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add category_id to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN category_id UUID REFERENCES public.blog_categories(id);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name)
VALUES ('blog-images', 'blog-images');

-- Storage policies for blog images
CREATE POLICY "Public can view blog images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'blog-images' AND 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update blog images" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (
  bucket_id = 'blog-images' AND 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete blog images" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (
  bucket_id = 'blog-images' AND 
  public.has_role(auth.uid(), 'admin')
);

-- Insert default categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Technology', 'technology', 'Posts about technology trends and insights'),
('Development', 'development', 'Software development tutorials and tips'),
('Career', 'career', 'Career advice and professional growth'),
('Personal', 'personal', 'Personal thoughts and experiences');

-- Update existing posts with author and category
UPDATE public.blog_posts 
SET category_id = (SELECT id FROM public.blog_categories WHERE slug = 'development' LIMIT 1)
WHERE slug = 'building-modern-web-applications-react-typescript';

UPDATE public.blog_posts 
SET category_id = (SELECT id FROM public.blog_categories WHERE slug = 'technology' LIMIT 1)
WHERE slug = 'future-of-fullstack-development';

UPDATE public.blog_posts 
SET category_id = (SELECT id FROM public.blog_categories WHERE slug = 'personal' LIMIT 1)
WHERE slug = 'my-journey-learning-software-development';

-- Add trigger for categories updated_at
CREATE TRIGGER update_blog_categories_updated_at
BEFORE UPDATE ON public.blog_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();