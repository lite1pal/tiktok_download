import Navbar from "@/components/navbar/navbar";
import Intro from "@/components/intro/intro";
import Footer from "@/components/footer/footer";
import Content from "@/components/content/content";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Intro />
      <Content />
      <Footer />
    </div>
  );
}
