import g from "@improbable-eng/grpc-web";

export const includeToken = (
  token?: string,
  metadata = new g.grpc.Metadata()
) => {
  if (token) metadata.append("authorization", `Bearer ${token}`);
  return metadata;
};
