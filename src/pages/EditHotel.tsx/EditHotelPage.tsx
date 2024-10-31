// import { useGetMyHotelBySlugQuery } from "@/app/api/myHotelsApi";
import Redirect from "@/utils/Redirect";
import { useParams } from "react-router-dom";

export default function EditHotelPage() {
  const { slug } = useParams();

  if (!slug) {
    return <Redirect target="/my-hotels" />;
  }
  //   const {} = useGetMyHotelBySlugQuery(slug,{});

  console.log("Slug is: ", slug);
  return <div>EditHotelPage</div>;
}
