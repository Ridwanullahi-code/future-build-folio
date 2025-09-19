import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  published_at: string;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) {
          console.error('Error fetching post:', error);
          setNotFound(true);
        } else {
          setPost(data);
          
          // Fetch related posts
          const { data: related } = await supabase
            .from('blog_posts')
            .select('id, title, slug, excerpt, tags, published_at, created_at, content')
            .eq('published', true)
            .neq('id', data.id)
            .limit(3);
          
          setRelatedPosts(related || []);
        }
      } catch (error) {
        console.error('Error:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>;
        }
        
        // Code blocks
        if (line.startsWith('```')) {
          return null; // Handle code blocks separately if needed
        }
        
        // Bullet points
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="ml-6 mb-1 list-disc">
              {line.substring(2)}
            </li>
          );
        }
        
        // Numbered lists
        const numberedMatch = line.match(/^(\d+)\.\s/);
        if (numberedMatch) {
          return (
            <li key={index} className="ml-6 mb-1 list-decimal">
              {line.substring(numberedMatch[0].length)}
            </li>
          );
        }
        
        // Bold text
        const boldFormatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />;
        }
        
        // Regular paragraphs
        return (
          <p key={index} className="mb-4 text-muted-foreground leading-relaxed" 
             dangerouslySetInnerHTML={{ __html: boldFormatted }} />
        );
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24">
          <div className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24">
          <div className="container mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24">
        <article className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Link>

            {/* Post Header */}
            <header className="mb-12">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar size={16} />
                <span>{formatDate(post.published_at || post.created_at)}</span>
                <Clock size={16} className="ml-4" />
                <span>5 min read</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              {formatContent(post.content)}
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="p-6 group card-hover">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar size={14} />
                        <span>{formatDate(relatedPost.published_at)}</span>
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <Link to={`/blog/${relatedPost.slug}`}>
                        <Button variant="ghost" size="sm" className="group/btn p-0 h-auto">
                          Read More
                          <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;