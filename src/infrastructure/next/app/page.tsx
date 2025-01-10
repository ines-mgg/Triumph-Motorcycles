// import Image from "next/image";
import { Button, Chip, ItemCard} from "@triumph-motorcycles/components";

export default function Home() {
  return (
    <>
      <Button label="label" ariaLabel="label"/>
      <Chip label="label" ariaLabel="label"/>
      <ItemCard titleCard="Item Card" contentCard="This is an item card" hasTags tagsList={["tag1", "tag2"]}/>
    </>
  );
}
