import Link from "next/link";
// import. dynamic from 'next/dynamic';

// const Heroanimation = dynamic(() => import("@/components/ui/heroanimation"), {
//   ssr: false,
//   loading: () => <div></div>
// });

function Hero() {
    return (
        <div className="bg-slate-50 py-8 md:py-0 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-[60%] flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Empowering students to thrive together</h1>
                    <p className="text-lg md:text-xl mb-6">Where students unite for growth and success</p>
                    <Link href={`/colleges`}>
                        <button className="text-lg md:text-xl bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out font-semibold">
                            Explore Colleges
                        </button>
                    </Link>
                </div>
                {/* <div className="md:w-[40%] flex justify-center md:justify-end">
                    <div className="w-full h-full">
                        <Heroanimation />
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Hero;
