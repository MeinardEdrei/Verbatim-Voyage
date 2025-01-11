import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[78%]">
            <Image 
              src="https://placehold.co/300x200"
              alt="Placeholder"
              width={300}
              height={200}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="grid grid-rows-2 gap-4 h-[78%]">
            <Image 
              src="https://placehold.co/300x200"
              alt="Placeholder"
              width={300} 
              height={200}
              className="w-full h-full object-cover rounded-2xl"
            />
            <Image 
              src="https://placehold.co/300x200"
              alt="Placeholder"
              width={300} 
              height={200}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
