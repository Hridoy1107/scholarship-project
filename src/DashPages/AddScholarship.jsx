import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddScholarship = () => {

    const { user } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();

    const handleAddData = async (event) => {
        event.preventDefault();

        const form = event.target;

        const scholarshipName = form.scholarshipName.value;
        const universityName = form.universityName.value;
        const photoFile = event.target.elements.photo.files[0];
        const country = form.country.value;
        const city = form.city.value;
        const rank = parseFloat(form.rank.value);
        const subjectCategory = form.subjectCategory.value;
        const scholarshipCategory = form.scholarshipCategory.value;
        const degreeCategory = form.degreeCategory.value;
        const tuitionFees = form.tuitionFees.value;
        const applicationFees = parseFloat(form.applicationFees.value);
        const serviceCharges = parseFloat(form.serviceCharges.value);
        const deadlineDate = form.deadlineDate.value;
        const postDate = form.postDate.value;

        const userName = form.userName.value;
        const email = form.email.value;
        const description = form.description.value;

        let photoURL = '';

        if (photoFile) {
            const formData = new FormData();
            formData.append('image', photoFile);

            try {
                const uploadRes = await axios.post(image_hosting_api, formData);
                photoURL = uploadRes.data.data.display_url;
            } catch (error) {
                console.error("Error uploading image to imgBB:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to upload image',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
        }
        
        const newScholarships = { scholarshipName, universityName,  country, city, photoURL, rank, subjectCategory, scholarshipCategory, degreeCategory, tuitionFees, applicationFees, serviceCharges, deadlineDate, postDate, userName, email, description }

        console.log(newScholarships);

        axiosPublic.post('/scholarships', newScholarships)
        .then(data => {
            console.log(data.data);
            if (data.data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Scholarship Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                form.reset();
            }
        })
    }

    return (
        <>
            <div className="bg-slate-100 py-8 lg:px-24 px-2 w-full rounded-2xl">
                <h2 className="mb-6 text-3xl font-bold text-teal-700">Add Scholarship</h2>
                <form onSubmit={handleAddData}>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Scholarship Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="scholarshipName"
                                    placeholder="Scholarship Name"
                                    className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">University Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="universityName" placeholder="University" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">University Logo</span>
                            </label>
                            <input className="mb-4 text-black w-full rounded-xl py-2 px-4" type="file" name="photo" />
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Country</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="country" placeholder="Country" className="input input-bordered w-full " />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">City</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="city"
                                    placeholder="City"
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">World Rank</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="rank" placeholder="Rank" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Subject Category</span>
                            </label>
                            <select
                                name="subjectCategory"
                                className="border p-2 rounded-md"
                            >
                                <option value="Agriculture">Agriculture</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Medical">Medical</option>
                            </select>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Scholarship Category</span>
                            </label>
                            <select
                                name="scholarshipCategory"
                                className="border p-2 rounded-md"
                            >
                                <option value="Full Fund">Full Fund</option>
                                <option value="Partial">Partial</option>
                                <option value="Self Fund">Self Fund</option>
                            </select>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Degree</span>
                            </label>
                            <select
                                name="degreeCategory"
                                className="border p-2 rounded-md"
                            >
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                            </select>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Tuition Fees</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="tuitionFees" defaultValue={'N/A'}
                                    readOnly={true} className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Application Fees</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="applicationFees"
                                    placeholder="Application Fees"
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Service Charges</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="serviceCharges" placeholder="Charges" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Deadline date</span>
                            </label>
                            <label className="input-group">
                                <input type="date" name="deadlineDate"
                                    className="input input-bordered w-full" min={new Date().toISOString().split("T")[0]} required  />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Post Date</span>
                            </label>
                            <label className="input-group">
                            <input type="text" name="postDate" defaultValue={new Date().toLocaleDateString('en-GB')} readOnly={true} className="input input-bordered w-full" />
                        </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">User Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={user?.displayName} name="userName"
                                    readOnly={true}
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">User Email</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={user?.email} name="email"
                                    readOnly={true} className="input input-bordered w-full " />
                            </label>
                        </div>
                    </div>
                    <label className="font-medium text-black">
                        Description
                    </label>
                    <textarea
                        className="block w-full px-4 py-2 mt-2 border rounded-md"
                        type="text" name="description" placeholder="Description"
                    ></textarea>
                    <input type="submit" value="Add Scholarship" className="btn btn-primary btn-block mt-4" />
                </form>
            </div>
        </>
    );
};

export default AddScholarship;