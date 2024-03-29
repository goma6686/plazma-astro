import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { CollectionEntry } from "astro:content";
import type { StringLiteralType } from "typescript";

//const { event } = Astro.props;
//<TinaMarkdown content={props} components={{ lol }} />
/*const lol = (props) =>  {
  return  <img src={props.eventImage} width="123"/>

export interface Props{
  frontmatter: CollectionEntry<"event">["data"];
  eventBodyImage?: string;
}}*/

export default function EventBody({ props }) {
  return (
    <>
      <h6>aaa</h6>
    </>
  );
}
