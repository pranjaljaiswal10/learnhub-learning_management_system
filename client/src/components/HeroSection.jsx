import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

const HeroSection = () => {
  const [searchTxt, setSearchTxt] = useState("");
  function handleChange(e) {
    setSearchTxt(e.target.value);
  }
  const handleClick = () => {};
  return (
    <section>
      <h1 className="pb-2 text-3xl font-semibold tracking-tight">
        Find the Best Courses for You
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Discover,Learn, and Upskill with our wide range of courses
      </p>
      <div>
        <Input
          type="text"
          placeholder="Search Courses"
          value={searchTxt}
          onChange={(e) => handleChange(e)}
        />
        <Button
          onClick={handleClick}
          className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800"
        >
          Button
        </Button>
      </div>
      <Button></Button>
    </section>
  );
};

export default HeroSection;
