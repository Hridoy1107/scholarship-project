import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";


const AddScholarship = () => {

    const { user } = useContext(AuthContext);

    const handleAddData = event => {
        event.preventDefault();

        const form = event.target;

        const dishName = form.dishName.value;
        const url = form.url.value;
        const category = form.category.value;
        const quantity = parseFloat(form.quantity.value);
        const price = parseFloat(form.price.value);
        const country = form.country.value;
        const userName = form.userName.value;
        const email = form.email.value;
        const description = form.description.value;

        const newFoods = { dishName, url, category, quantity, price, country, userName, email, description }

        console.log(newFoods);

        fetch(' https://restaurant-server-theta.vercel.app/foods', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFoods)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Dish Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
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
                                <span className="label-text font-medium text-black">Food Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="dishName"
                                    placeholder="Dish Name"
                                    className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Image</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="url" placeholder="Photo Url" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Category</span>
                            </label>
                            <select
                                name="category"
                                className="border p-2 rounded-md"
                            >
                                <option value="Appetizers">Appetizers</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Desserts">Desserts</option>
                            </select>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Quantity</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="quantity" placeholder="Food Quantity" className="input input-bordered w-full " />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Price</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="price"
                                    placeholder="Price"
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Origin</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="country" placeholder="Country Name" className="input input-bordered w-full" />
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
                    <input type="submit" value="Add Food" className="btn btn-primary btn-block mt-4" />
                </form>
            </div>
        </>
    );
};

export default AddScholarship;