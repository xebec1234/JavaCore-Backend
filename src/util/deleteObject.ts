import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3-credentials";

export const deleteObject = async (fileKey: string) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileKey,
    };

    const command = new DeleteObjectCommand(params);
    const data = await s3Client.send(command);

    if (data.$metadata.httpStatusCode !== 204) {
      console.error("Failed to delete object from S3:", data);
      return { success: false };
    }

    console.log(`Deleted successfully: ${fileKey}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting object:", error);
    return { success: false, error };
  }
};
