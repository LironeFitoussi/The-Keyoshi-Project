import BooksContainer from "@/components/Organisms/BooksContainer";

/** Simple shape for the component props */
export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string; // relative path or remote URL
}

/** A quick bookshelf of every Avatar prose novel & post‑series comic trilogy */
const sampleBooks: Book[] = [
  // Kyoshi cycle
  {
    id: "1",
    title: "Avatar: The Rise of Kyoshi",
    author: "F.C. Yee & Michael Dante DiMartino",
    cover: "/covers/rise-of-kyoshi.jpg",
  },
  {
    id: "2",
    title: "Avatar: The Shadow of Kyoshi",
    author: "F.C. Yee & Michael Dante DiMartino",
    cover: "/covers/shadow-of-kyoshi.jpg",
  },

  // Yangchen cycle
  {
    id: "3",
    title: "Avatar: The Dawn of Yangchen",
    author: "F.C. Yee & Michael Dante DiMartino",
    cover: "/covers/dawn-of-yangchen.jpg",
  },
  {
    id: "4",
    title: "Avatar: The Legacy of Yangchen",
    author: "F.C. Yee & Michael Dante DiMartino",
    cover: "/covers/legacy-of-yangchen.jpg",
  },
//   Roku cycle
  {
    id: "5",
    title: "Avatar: The Reckoning of Roku",
    author: "Randy Ribay",
    cover: "/covers/reckoning-of-roku.jpg",
  },

];

export default function Books() {
  return (
    <BooksContainer
      books={sampleBooks}
      onRead={(book) => console.log("📖 Read:", book)}
    />
  );
}
