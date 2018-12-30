import LindaClientAsync from "linda-client-async";

//FIXME:型
export const subscribe = async (
  publisherURL: string,
  subscriberURL: string,
  subscribeTuple: Object
) => {
  const publisher = new LindaClientAsync();
  const subscriber = new LindaClientAsync();
  await publisher.connect(publisherURL);
  await subscriber.connect(subscriberURL);
  publisher.watch(subscribeTuple, async data => {
    await subscriber.write(data);
  });
};
