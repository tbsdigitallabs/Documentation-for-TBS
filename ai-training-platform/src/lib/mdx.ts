import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export type ModuleMetadata = {
    title?: string;
    description?: string;
    estimatedTime?: string;
    difficulty?: string;
    prerequisites?: string;
    order?: number; // Optional order field for custom sorting
    slug: string;
    role: string;
    questions?: Array<{
        id: string;
        question: string;
        options: string[];
        correctAnswer: number;
    }>;
};

export type ModuleContent = {
    metadata: ModuleMetadata;
    content: string;
};

export function getModuleSlugs(role: string) {
    const roleDirectory = path.join(contentDirectory, role);
    if (!fs.existsSync(roleDirectory)) return [];
    return fs.readdirSync(roleDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getModuleBySlug(role: string, slug: string): ModuleContent {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, role, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Module not found: ${fullPath}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Fallback for title if not in frontmatter (parse from H1)
    let title = data.title;
    if (!title) {
        const h1Match = content.match(/^#\s+(.+)$/m);
        if (h1Match) {
            title = h1Match[1];
        }
    }

    return {
        metadata: {
            ...data,
            title,
            slug: realSlug,
            role,
        },
        content,
    };
}

export function getAllModules(role: string): ModuleMetadata[] {
    const slugs = getModuleSlugs(role);
    const modules = slugs
        .map((slug) => {
            try {
                return getModuleBySlug(role, slug).metadata;
            } catch (error) {
                console.warn(`Failed to load module ${slug} for role ${role}:`, error);
                return null;
            }
        })
        .filter((module): module is ModuleMetadata => module !== null)
        // Sort by order field if present, otherwise by title, then by slug
        .sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) {
                return a.order - b.order;
            }
            if (a.order !== undefined) return -1;
            if (b.order !== undefined) return 1;
            if (a.title && b.title) {
                return a.title.localeCompare(b.title);
            }
            return a.slug.localeCompare(b.slug);
        });
    return modules;
}
