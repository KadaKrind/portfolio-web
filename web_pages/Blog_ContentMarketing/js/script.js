// Sample Blog Articles Data
const articles = [
    {
        id: 1,
        title: "10 Essential SEO Tips to Boost Your Rankings in 2025",
        category: "seo",
        excerpt: "Learn the latest SEO techniques that will help your website rank higher on search engines and drive more organic traffic.",
        author: "Rodrigo Porcel",
        readTime: "8 min",
        emoji: "📈"
    },
    {
        id: 2,
        title: "Content Marketing Strategy: From Planning to Execution",
        category: "content",
        excerpt: "Discover how to create a content marketing strategy that resonates with your audience and drives conversions.",
        author: "Rodrigo Porcel",
        readTime: "10 min",
        emoji: "✍️"
    },
    {
        id: 3,
        title: "Social Media Marketing: Building Your Brand on Instagram and TikTok",
        category: "social",
        excerpt: "Master social media marketing with practical tips for growing your followers and increasing engagement.",
        author: "Rodrigo Porcel",
        readTime: "7 min",
        emoji: "📱"
    },
    {
        id: 4,
        title: "Email Marketing Campaigns That Convert",
        category: "email",
        excerpt: "Learn how to create email campaigns that engage your subscribers and turn them into paying customers.",
        author: "Rodrigo Porcel",
        readTime: "9 min",
        emoji: "📧"
    },
    {
        id: 5,
        title: "Understanding Google Analytics for Better Decision Making",
        category: "analytics",
        excerpt: "Dive deep into Google Analytics and learn how to interpret data to improve your marketing strategy.",
        author: "Rodrigo Porcel",
        readTime: "11 min",
        emoji: "📊"
    },
    {
        id: 6,
        title: "On-Page SEO: The Complete Guide to Optimizing Your Web Pages",
        category: "seo",
        excerpt: "Master on-page SEO techniques to optimize title tags, meta descriptions, headers, and more.",
        author: "Rodrigo Porcel",
        readTime: "12 min",
        emoji: "🔍"
    },
    {
        id: 7,
        title: "Creating Viral Content: Strategies That Work",
        category: "content",
        excerpt: "Explore proven strategies for creating content that gets shared and goes viral on social platforms.",
        author: "Rodrigo Porcel",
        readTime: "8 min",
        emoji: "💥"
    },
    {
        id: 8,
        title: "Influencer Marketing: How to Partner with the Right Influencers",
        category: "social",
        excerpt: "Learn how to find, approach, and collaborate with influencers to amplify your brand message.",
        author: "Rodrigo Porcel",
        readTime: "7 min",
        emoji: "⭐"
    },
    {
        id: 9,
        title: "Email Segmentation: Send the Right Message to the Right People",
        category: "email",
        excerpt: "Discover how email segmentation can dramatically improve your open rates and conversion rates.",
        author: "Rodrigo Porcel",
        readTime: "6 min",
        emoji: "🎯"
    },
    {
        id: 10,
        title: "Conversion Rate Optimization: 15 Strategies That Work",
        category: "analytics",
        excerpt: "Learn fifteen proven strategies to increase your website's conversion rate and maximize ROI.",
        author: "Rodrigo Porcel",
        readTime: "13 min",
        emoji: "📈"
    },
    {
        id: 11,
        title: "Backlink Building: The Modern Approach to Link Building",
        category: "seo",
        excerpt: "Master the art of building high-quality backlinks that improve your website's authority and rankings.",
        author: "Rodrigo Porcel",
        readTime: "10 min",
        emoji: "🔗"
    },
    {
        id: 12,
        title: "Blog SEO: How to Write Articles That Rank",
        category: "content",
        excerpt: "Learn how to write blog posts that are both engaging and optimized for search engines.",
        author: "Rodrigo Porcel",
        readTime: "8 min",
        emoji: "📝"
    },
    {
        id: 13,
        title: "TikTok Marketing: Reaching Gen Z Through Short-Form Video",
        category: "social",
        excerpt: "Discover how to leverage TikTok's algorithm to reach millions of potential customers in Gen Z.",
        author: "Rodrigo Porcel",
        readTime: "7 min",
        emoji: "🎬"
    },
    {
        id: 14,
        title: "Newsletter Best Practices: Building a Loyal Subscriber Base",
        category: "email",
        excerpt: "Learn the best practices for creating newsletters that your subscribers actually want to read.",
        author: "Rodrigo Porcel",
        readTime: "6 min",
        emoji: "📬"
    },
    {
        id: 15,
        title: "A/B Testing: The Scientific Approach to Marketing",
        category: "analytics",
        excerpt: "Master A/B testing to scientifically determine which marketing strategies work best for your business.",
        author: "Rodrigo Porcel",
        readTime: "9 min",
        emoji: "🧪"
    },
    {
        id: 16,
        title: "Local SEO: Dominating Your Local Search Results",
        category: "seo",
        excerpt: "Learn how to optimize your website for local search and dominate your local market.",
        author: "Rodrigo Porcel",
        readTime: "8 min",
        emoji: "📍"
    },
    {
        id: 17,
        title: "Repurposing Content: Get More Value From Your Content",
        category: "content",
        excerpt: "Discover how to repurpose your content across multiple platforms to maximize your reach and ROI.",
        author: "Rodrigo Porcel",
        readTime: "7 min",
        emoji: "♻️"
    },
    {
        id: 18,
        title: "LinkedIn Marketing: B2B Strategy for Growth",
        category: "social",
        excerpt: "Master LinkedIn marketing to generate leads, build authority, and grow your B2B business.",
        author: "Rodrigo Porcel",
        readTime: "9 min",
        emoji: "💼"
    },
    {
        id: 19,
        title: "Email Automation: Save Time and Increase Results",
        category: "email",
        excerpt: "Learn how to set up email automation workflows that nurture leads while you sleep.",
        author: "Rodrigo Porcel",
        readTime: "10 min",
        emoji: "⚙️"
    },
    {
        id: 20,
        title: "Heatmap Analysis: Understanding User Behavior",
        category: "analytics",
        excerpt: "Learn how to use heatmaps to understand how users interact with your website and improve UX.",
        author: "Rodrigo Porcel",
        readTime: "8 min",
        emoji: "🔥"
    },
    {
        id: 21,
        title: "Mobile SEO: Optimizing for the Mobile-First World",
        category: "seo",
        excerpt: "Optimize your website for mobile devices to capture the growing mobile search market.",
        author: "Rodrigo Porcel",
        readTime: "9 min",
        emoji: "📱"
    },
    {
        id: 22,
        title: "Video Marketing: How to Use Video to Boost Your Business",
        category: "content",
        excerpt: "Discover the power of video marketing and learn how to create videos that convert.",
        author: "Rodrigo Porcel",
        readTime: "8 min",
        emoji: "🎥"
    }
];

let currentCategory = 'all';

// Load articles on page load
document.addEventListener('DOMContentLoaded', function() {
    displayArticles(articles);
    
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing! Check your email for confirmation.');
        this.reset();
    });
});

// Display articles
function displayArticles(articlesToDisplay) {
    const articlesGrid = document.getElementById('articlesGrid');
    articlesGrid.innerHTML = '';

    if (articlesToDisplay.length === 0) {
        articlesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No articles found in this category.</p>';
        return;
    }

    articlesToDisplay.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';
        articleCard.innerHTML = `
            <div class="article-image">${article.emoji}</div>
            <div class="article-body">
                <span class="article-category ${article.category}">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-footer">
                    <span class="article-author">👤 ${article.author}</span>
                    <span class="read-time">⏱️ ${article.readTime}</span>
                </div>
            </div>
        `;
        articlesGrid.appendChild(articleCard);
    });
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display articles
    let filtered = category === 'all' 
        ? articles 
        : articles.filter(article => article.category === category);
    
    displayArticles(filtered);
    scrollToSection('blog');
}

// Search articles
function searchArticles() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    let filtered = articles.filter(article => 
        article.title.toLowerCase().includes(searchInput) ||
        article.excerpt.toLowerCase().includes(searchInput)
    );

    displayArticles(filtered);
}

// Toggle search bar
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    
    if (searchBar.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

// Smooth scroll
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}
