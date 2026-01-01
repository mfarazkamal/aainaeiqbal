import {sanitizeExcerpt} from '../utils/sanitizeExcerpt';
function PostCard({ posts }) {
  console.log(posts);

  return (
    <>
      <section className="px-32 py-10 flex gap-8 flex-wrap bg-neutral-primary-light">
        {posts.map((post) => {
          return (
            <div key={post.id} className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-sm shadow-xs">
              <a href="#">
                <img
                  className="rounded-lg"
                  src="https://aainaeiqbal.co.in/wp-content/uploads/2024/12/Image_Editor.png"
                  alt=""
                />
              </a>
              <a href="#">
                <h5 className="mt-3 mb-5 text-3xl text-right tracking-tight text-heading">
                  {post.title.rendered}
                </h5>
              </a>
              <p className="mb-6 text-2xl text-center text-gray-700">
                {sanitizeExcerpt(post.excerpt.rendered)}
              </p>
              <a
                href={post.link}
                className="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none"
              >
                تشریح پڑھیں
                <svg
                  className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </a>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default PostCard;
