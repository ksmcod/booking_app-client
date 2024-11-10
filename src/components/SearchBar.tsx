import Select from "react-select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Button from "./ui/button";
import { Search, SearchX } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="px-5">
      <form className="max-w-5xl mx-auto rounded-sm bg-orange-400 p-3 text-base shadow-md grid grid-cols-1 sm:grid-cols-2 sm:-translate-y-1/3 lg:grid-cols-4 gap-1 items-center">
        {/* Dropdown to choose destination country */}
        <div className="">
          <Select placeholder="Destination country" />
        </div>

        {/* Dropdown to choose destination city */}
        <div className="">
          <Select placeholder="Destination city" />
        </div>

        {/* Select number of adults and children */}
        <div className="bg-white flex justify-center items-center rounded-sm">
          <Label htmlFor="adults" className="flex items-center px-1">
            Adults:
            <Input
              id="adults"
              type="number"
              className="border-none"
              min={1}
              defaultValue={1}
            />
          </Label>

          <Label htmlFor="children" className="flex items-center px-1">
            Children:
            <Input
              id="children"
              type="number"
              className="border-none"
              min={0}
              defaultValue={0}
            />
          </Label>
        </div>

        {/* Search and clear buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="primary"
            className="flex justify-center items-center px-3 self-stretch"
          >
            <Search />
            <span>Search</span>
          </Button>

          <Button className="flex justify-center items-center bg-red-500 px-3">
            <SearchX />
            <span>Clear</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
