export  const AppConstant = {
    API_URI: "http://localhost:8000"
}
export const API_URL = "http://localhost:8000";
export const API_URL_UPLOADS_POSTS = "http://localhost:8000/uploads/posts";
export const API_URL_UPLOADS_DOCUMENTS = "http://localhost:8000/uploads/document";
export const API_URL_UPLOADS_EVENTS = "http://localhost:8000/uploads/events";
export const API_URL_UPLOADS_PROJECTS = "http://localhost:8000/uploads/projects";
export const  API_URL_UPLOADS_BANNERS = "http://localhost:8000/uploads/banners"
export const  API_URL_UPLOADS_STORES = "http://localhost:8000/uploads/stores"
export const  API_URL_UPLOADS_PRODUCTS = "http://localhost:8000/uploads/products"
export const  API_URL_UPLOADS_COURSES = "http://localhost:8000/uploads/courses"

export const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  