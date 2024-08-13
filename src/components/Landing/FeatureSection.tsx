import Feat1 from "@/assets/features/2.png";
import Feat3 from "@/assets/features/3.png";
import Feat4 from "@/assets/features/4.png";
import Feat5 from "@/assets/features/5.png";
import Image from "next/image";

const features = [
  {
    title: "Campus Connections",
    description:
      "Connect with fellow students from your college and other campuses around the world.",
    image: Feat1,
    reverse: false,
  },
  {
    title: "Custom Profiles",
    description: "Create personalized profiles to showcase your interests, skills, and experiences.",
    image : Feat5,
    reverse : true
  },
  {
    title : "Search People",
    description : "Search students by entering their username using our Searchbar",
    image : Feat3,
    reverse : false
  },
  {
    title : "Explore Colleges",
    description : "Find students from a Specific college from our assoicated college lists",
    image : Feat4,
    reverse : true
  }
];

function FeaturesSection() {
  return (
    <section className=" bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Features
        </h2>
        <div className="flex flex-col gap-8">
          {
            features.map((e,i)=>(
              <FeatureCard
              key={i}
              title={e.title}
              description={e.description}
              // icon={<i className="fas fa-users text-3xl text-gray-700"></i>}
              image={e.image}
              reverse={e.reverse}
            />
            ))
          }
        </div>
      </div>
    </section>
  );
}
export default FeaturesSection;

function FeatureCard({ title, description, image, reverse }: any) {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } gap-8`}
    >
      <div className="md:w-[63%]">
        <Image src={image} alt={title} className="rounded-lg" />
      </div>
      <div className="md:w-[37%] flex flex-col justify-center px-4 md:px-0">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
          {title}
        </h3>
        <p className="text-lg md:text-xl text-gray-700">{description}</p>
      </div>
    </div>
  );
}
