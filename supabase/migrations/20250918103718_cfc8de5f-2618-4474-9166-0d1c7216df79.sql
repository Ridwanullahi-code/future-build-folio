-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  tags TEXT[],
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published posts
CREATE POLICY "Published posts are publicly readable" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-generate slug
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Insert some sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, tags, published, published_at) VALUES
(
  'Building Modern Web Applications with React and TypeScript',
  'building-modern-web-applications-react-typescript',
  'Explore the power of combining React with TypeScript for building scalable and maintainable web applications.',
  '# Building Modern Web Applications with React and TypeScript

In today''s fast-paced development environment, creating robust and scalable web applications is crucial. React combined with TypeScript provides an excellent foundation for building modern applications.

## Why React and TypeScript?

React has revolutionized how we build user interfaces, while TypeScript adds static typing to JavaScript, making our code more reliable and easier to maintain.

### Key Benefits:
- **Type Safety**: Catch errors at compile time
- **Better Developer Experience**: Enhanced IDE support
- **Scalability**: Easier to maintain large codebases
- **Team Collaboration**: Clear interfaces and contracts

## Getting Started

Setting up a React TypeScript project is straightforward with modern tooling like Vite or Create React App.

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

This gives you a solid foundation to build upon with hot reload, TypeScript support, and modern build tooling.',
  ARRAY['React', 'TypeScript', 'Web Development', 'Frontend'],
  true,
  now() - interval '5 days'
),
(
  'The Future of Full-Stack Development',
  'future-of-fullstack-development',
  'Discover emerging trends and technologies shaping the future of full-stack development.',
  '# The Future of Full-Stack Development

The landscape of web development continues to evolve rapidly. As a full-stack developer, staying ahead of trends is essential for career growth and project success.

## Emerging Technologies

### 1. Edge Computing
Edge computing is bringing computation closer to users, reducing latency and improving performance.

### 2. Serverless Architecture
Functions as a Service (FaaS) platforms are making deployment and scaling easier than ever.

### 3. AI Integration
AI tools are becoming integral to the development process, from code generation to testing.

## Best Practices for 2024

- **Performance First**: Optimize for Core Web Vitals
- **Security by Design**: Implement security from the ground up
- **Accessibility**: Build inclusive applications
- **Sustainability**: Consider the environmental impact of your code

The future is bright for full-stack developers who embrace these technologies and practices.',
  ARRAY['Full-Stack', 'Technology Trends', 'Career Development'],
  true,
  now() - interval '2 days'
),
(
  'My Journey Learning Software Development',
  'my-journey-learning-software-development',
  'A personal reflection on my path to becoming a software developer, challenges faced, and lessons learned.',
  '# My Journey Learning Software Development

Starting my journey in software development has been an incredible adventure filled with challenges, discoveries, and continuous learning.

## The Beginning

My interest in technology began during my studies at FUTA, where I discovered the power of programming to solve real-world problems.

## Key Milestones

### University Education
At Federal University of Technology, Akure, I built a strong foundation in:
- Computer Science fundamentals
- Data structures and algorithms
- Database management
- Software engineering principles

### Microverse Experience
The remote collaborative program at Microverse taught me:
- Pair programming techniques
- Code review processes
- Professional development workflows
- International collaboration

## Challenges and Growth

Every developer faces challenges. Here are some I encountered:

1. **Imposter Syndrome**: Learning to trust my abilities
2. **Technology Overload**: Focusing on fundamentals first
3. **Remote Collaboration**: Adapting to distributed teams

## What''s Next?

The journey continues with exciting projects and new technologies to explore. Every day brings opportunities to learn and grow as a developer.',
  ARRAY['Personal', 'Career', 'Learning', 'Development Journey'],
  true,
  now() - interval '7 days'
);