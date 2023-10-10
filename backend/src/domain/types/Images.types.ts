import { objectToDbRow } from "../../modules/database/mapper";
import { ObjectToDbTypeMapper } from "./Globals.type";
import { MetaData } from "./MetaData.type";

type ImageId = string;

interface Image extends MetaData {
  id: ImageId;
  path: string;
}

interface ImageRow extends ObjectToDbTypeMapper<Image> {}

export { Image, ImageId, ImageRow };
