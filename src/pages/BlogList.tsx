import { useEffect, useState } from "react";
import { Calendar, Clock, Tag, ArrowRight, Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  published_at: string;
  created_at: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, tags, published_at, created_at')
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts:', error);
        } else {
          setPosts(data || []);
          setFilteredPosts(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background/95 to-accent/5">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Blog & <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Thoughts, tutorials, and insights on software development, technology trends, and my journey as a developer
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-32 mb-3"></div>
                      <div className="h-6 bg-muted rounded mb-2"></div>
                      <div className="h-6 bg-muted rounded w-4/5"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {searchTerm ? `No posts found for "${searchTerm}"` : "No blog posts yet. Check back soon!"}
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm("")}
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <>
                {searchTerm && (
                  <div className="mb-8">
                    <p className="text-muted-foreground">
                      Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="group card-hover h-full flex flex-col">
                      <CardHeader className="flex-none">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar size={16} />
                          <span>{formatDate(post.published_at || post.created_at)}</span>
                          <Clock size={16} className="ml-2" />
                          <span>5 min read</span>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </CardHeader>
                      
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                <Tag size={12} className="mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <Link to={`/blog/${post.slug}`} className="mt-auto">
                          <Button variant="ghost" className="group/btn p-0 h-auto justify-start">
                            Read More
                            <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogList;