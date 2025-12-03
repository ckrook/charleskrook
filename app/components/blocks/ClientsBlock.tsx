import FadeInOnScroll from "../wrappers/FadeInOnScroll";
import { Client } from "../../types";
import CardItem from "../parts/CardItem";
import { BlockHeading } from "../parts/BlockHeading";

interface ClientsBlockProps {
  clients: Client[];
}

const ClientsBlock = ({ clients }: ClientsBlockProps) => {
  const date = clients.map((client: Client) => client.name);
  return (
    <div className="col-span-8 sm:col-start-1 sm:col-end-9">
      <div className="mb-16 px-0 md:px-4 md:mb-32 col-span-4 sm:col-span-8">
        {/* Clients section */}
        {clients && clients.length > 0 && (
          <FadeInOnScroll duration={0.8} y={40}>
            <div className="mb-8">
              <BlockHeading headingSize="h2" className="mb-4">
                Client Portfolio
              </BlockHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-20">
                {clients
                  .filter((client: Client) => client.name !== "Radiohjälpen")
                  .map((client: Client, index: number) => (
                    <FadeInOnScroll
                      key={index}
                      delay={index * 0.06}
                      duration={0.6}
                      y={25}
                    >
                      <CardItem
                        title={client.name}
                        subtitle={client.name}
                        logoImageUrl={client.logo?.url}
                        brandColor={client.brandColor}
                        imageWidth={52}
                        imageHeight={52}
                        arrow={true}
                        linkUrl={client.liveSite}
                      />
                    </FadeInOnScroll>
                  ))}
              </div>
            </div>
          </FadeInOnScroll>
        )}
      </div>
    </div>
  );
};

export default ClientsBlock;
