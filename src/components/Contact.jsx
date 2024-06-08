

const Contact = () => {
    return (
        <>
           <h3 className="text-4xl md:text-5xl text-indigo-400 font-semibold">
                Contact Us
            </h3>
            <div className="my-3">
            <div className="lg:flex justify-center items-center gap-3">
                    <div className="bg-green-300 p-4 mt-3">
                    <h3 className="font-medium text-xl text-black">Phone Number :</h3>
                    <h3 className="font-semibold text-base text-black">(+62) 123-321-543</h3>
                    </div>
                    <div className="bg-yellow-300 p-4 mt-3">
                    <h3 className="font-medium text-xl text-black">Email :</h3>
                    <h3 className="font-bold text-[16px] text-black">uniaid@support.com</h3>
                    </div>
                    <div className="bg-blue-300 p-4 mt-3">
                    <h3 className="font-medium text-xl text-black">Office :</h3>
                    <h3 className="font-semibold text-base text-black">162/6 Monachal Blues Gate</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;