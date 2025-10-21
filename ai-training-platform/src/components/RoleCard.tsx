import Link from 'next/link';

export default function RoleCard({
    title,
    description,
    features,
    color,
    href
}: {
    title: string;
    description: string;
    features: string[];
    color: string;
    href: string;
}) {
    return (
        <div className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-navy-primary mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{description}</p>
                <div className="space-y-2 mb-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-800">
                            <span className={`w-2 h-2 ${color} rounded-full mr-2`}></span>
                            {feature}
                        </div>
                    ))}
                </div>
                <Link href={href}>
                    <button className="w-full bg-navy-primary hover:bg-navy-primary/90 text-white py-2 px-4 rounded-md transition-colors">
                        Start Learning
                    </button>
                </Link>
            </div>
        </div>
    );
}
