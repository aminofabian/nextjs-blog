import Head from "next/head";
import { getPostSlugs, getSinglePost } from "../../lib/posts";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export default function Post({ postData, featuredImageUrl }) {
    return (
        <>
        {/* <p>This is a blog post - {postData.slug}</p> */}
        <Head>
            <title>{postData.title}</title>
            <meta name="description" content={postData.excerpt} key="metaDescription" />
        </Head>
        <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
            <div className="container lg:max-w-4xl mx-auto">
                <SiteHeader className="z-10 relative" />
            </div>
        </section>
        <article>
            <section className={`hero-area h-[60vh] min-h-[30rem] bg-no-repeat bg-cover bg-center relative`} style={{backgroundImage: featuredImageUrl }}>
                <div className="container lg:max-w-4xl mx-auto h-full flex flex-col justify-center">
                    <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
                    <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8 mt-12">
                        {postData.title}
                    </h1>
                    <div className="relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200 " dangerouslySetInnerHTML = {{ __html: postData.excerpt }}/>
                </div>
            </section>
            <section className="content-area py-8">
                <div className="post-content container mx-auto lg:max-w-4xl" dangerouslySetInnerHTML={{ __html: postData.content }} />
            </section>
        </article>
        <SiteFooter />
        </>
    );
}

export async function getStaticProps({ params }) {
    const postData = await getSinglePost(params.slug);
    console.log(postData);

    return {
        props: {
            postData,
            featuredImageUrl: "url(" + postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl + ")",
        },
    };
}

export async function getStaticPaths() {
    const slugs = await getPostSlugs();

    console.log(slugs);

    return {
        paths: slugs.map((slug) => (
        {
            params: {
                slug: `${slug.slug}`
            }
        }
        )),
        fallback: false
    };
}
// export async function getStaticPaths() {
//     return { 
//         paths: [
//             {
//                 params: {
//                     slug: 'travel-tips-for-beginners'
//                 }
//             },
//             {
//                 params: {
//                     slug: 'best-places-to-visit-in-india'
//                 }
//             }
//         ],
//         fallback: false
//     };
// }

// export async function getStaticProps({ params }) {
//     console.log(params.slug);
//     return {
//         props: {
//             postData: {
//                 slug: params.slug
//             }
//         }
//     }
// }