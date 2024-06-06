import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditApplication = () => {

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const applications = useLoaderData();
    const { _id, applicantAddress, contactNumber, universityName, subjectCategory, sscResult, hscResult, scholarshipCategory, degreeCategory} = applications

    const handleEditData = async (event) => {
        event.preventDefault();

        const form = event.target;

        const contactNumber = form.contactNumber.value;
        const applicantAddress = form.applicantAddress.value;
        const gender = form.gender.value;
        const sscResult = form.sscResult.value;
        const hscResult = form.hscResult.value;
        const universityName = form.universityName.value;
        const photoFile = event.target.elements.photo.files[0];
        const subjectCategory = form.subjectCategory.value;
        const scholarshipCategory = form.scholarshipCategory.value;
        const degreeCategory = form.degreeCategory.value;

        const userName = form.userName.value;
        const email = form.email.value;

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

        const editedApplications = { applicantAddress, contactNumber, universityName, gender, photoURL, subjectCategory, sscResult, hscResult, scholarshipCategory, degreeCategory, userName, email }

        axiosPublic.put( `/applications/${_id}`, editedApplications)
            .then(data => {
                console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Application Edited Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }

    return (
        <>
            <div className="bg-slate-100 mt-8 py-8 lg:px-24 px-2 w-full rounded-2xl">
                <h2 className="mb-6 text-3xl font-bold text-teal-700">Edit Application</h2>
                <form onSubmit={handleEditData}>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Applicant Number</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="contactNumber"
                                    placeholder="Applicant Number"
                                    defaultValue={contactNumber}
                                    className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Applicant Address</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="applicantAddress" 
                                defaultValue={applicantAddress}placeholder="District, Country" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Applicant Photo</span>
                            </label>
                            <input className="mb-4 text-black w-full rounded-xl py-2 px-4" type="file" name="photo" />
                        </div>
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Gender</span>
                            </label>
                            <select
                                name="gender"
                                className="border p-2 rounded-md"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">SSC Result</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="sscResult"
                                    placeholder="GPA"
                                    defaultValue={sscResult}
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">HSC Result</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="hscResult" placeholder="GPA" 
                                defaultValue={hscResult}
                                className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">University Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="universityName" defaultValue={universityName}
                                    readOnly={true} className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Subject Category</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="subjectCategory" defaultValue={subjectCategory}
                                    readOnly={true} className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Degree</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="degreeCategory" defaultValue={degreeCategory}
                                    readOnly={true} className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Scholarship Category</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="scholarshipCategory" defaultValue={scholarshipCategory}
                                    readOnly={true} className="input input-bordered w-full" />
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
                    <input type="submit" value="Edit Application" className="btn btn-primary btn-block mt-4" />
                </form>
            </div>
        </>
    );
};

export default EditApplication;