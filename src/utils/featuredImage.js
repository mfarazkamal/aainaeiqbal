function getFeaturedImage(post) {
  const media =
    post?._embedded?.["wp:featuredmedia"]?.[0];

  if (!media) return null;

  return {
    src:
      media.media_details?.sizes?.medium_large?.source_url ||
      media.source_url,
    alt: media.alt_text || post.title.rendered,
    width: media.media_details?.width,
    height: media.media_details?.height,
  };
}

export default getFeaturedImage;