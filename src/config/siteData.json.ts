export interface SiteDataProps {
	name: string;
	title: string;
	description: string;
	useViewTransitions?: boolean; // defaults to false. Set to true to enable some Astro 3.0 view transitions
	author: {
		name: string;
		email: string;
		twitter: string; // used for twitter cards when sharing a blog post on twitter
	};
	defaultImage: {
		src: string;
		alt: string;
	};
}

// Update this file with your site specific information
const siteData: SiteDataProps = {
	name: "Vermeulen Photography",
	// Your website's title and description (meta fields)
	title: "Vermeulen Photography",
	description:
		"Get your next website up and running quickly with our beautiful website theme designed using Astro and Tailwind CSS. Perfect for freelancers, developers, startups, and personal use.",
	useViewTransitions: true,
	// Your information!
	author: {
		name: "Vermeulen Photography",
		email: "gerrit@vermeulen.photography",
		twitter: "",
	},

	// default image for meta tags if the page doesn't have an image already
	defaultImage: {
		src: "/images/default-image.jpg",
		alt: "Vermeulen Photography logo",
	},
};

export default siteData;
