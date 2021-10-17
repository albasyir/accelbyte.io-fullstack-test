import { serialize } from "object-to-formdata";

export default function objectToFormdata(obj) {
  return serialize(obj, {
    indices: true,
  });
}
