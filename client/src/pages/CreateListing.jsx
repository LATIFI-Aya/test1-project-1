import React, { useState } from 'react';
import { categories, facilities, types } from '../assets/data';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BiTrash } from 'react-icons/bi';
import {IoIosImages } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import Header from '../components/Header';


 const CreateListing = () => {
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [photos, setPhotos] = useState([]);
    const creatorId = useSelector((state) => state.user._id);
    const navigate = useNavigate();

    //Adress / location
    const [formLocation, setFormLocation] = useState({
        streetAddress: "",
        aptSuite: "",
        city: "",
        province: "",
        country: "",
    });

    const handleChangeLocation = (e) => {
        const { name, value } = e.target;
        setFormLocation({...formLocation, [name]: value, });
    };

    // counts
    const [guestCount, setGuestCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    

    // Amenities Facilities
    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
            setAmenities((prevAmenities) => prevAmenities.filter((option) => option !== facility));
        } else {
            setAmenities((prev) => [...prev, facility]);
        }
    };

    //console.log(amenities)

    const handleUploadPhotos = (e) => {
        const newPhotos = e.target.files;
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
    };

    const handleDragPhoto = (result) => {
        if (!result.destination) return;
        const items = Array.from(photos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPhotos(items);
    }


    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove));
    }
    
    // FormDescripton
    const [ formDescription, setFormDescription] = useState({
        title: "",
        description: "",
        price: 0,
    });

    const handleChangeDescription = (e) => {
        const { name, value } = e.target;
        setFormDescription({...formDescription, [name]: value});
    };

    

// create Property function
    const handlePost = async (e) => {
        e.preventDefault();
        try {
            // Create a new FormData onject to handle file uploads
            const listingForm = new FormData();
            listingForm.append("creator", creatorId);
            listingForm.append("category", category); 
            listingForm.append ("type", type); 
            listingForm.append ("streetAddress", formLocation.streetAddress);
            listingForm.append ("aptSuite",formLocation.aptSuite);
            listingForm.append ("city", formLocation.city); 
            listingForm.append ("province", formLocation.province); 
            listingForm.append ("country",formLocation.country); 
            listingForm.append ("guestCount", guestCount); 
            listingForm.append ("bedroomCount", bedroomCount);
            listingForm.append ("bedCount", bedCount); 
            listingForm.append ("bathroomCount", bathroomCount); 
            listingForm.append ("amenities", amenities); 
            listingForm.append ("title", formDescription.title); 
            listingForm.append("description", formDescription.description);
            listingForm.append("price", formDescription.price);

            //Append each selected photos to the FormData object
            photos.forEach((photo) => {
                listingForm.append("listingPhotos", photo);
            });
            // Send POST raquest to server
            const response = await fetch("http://localhost:4000/listing/create",{ 
                method: "POST",
                body: listingForm,
        });

        if(response.ok){
            navigate("/");
        }
        } catch (err) {
            console.log("Publish Listing failed", err.message)
        }
    };

  return (
    <>
      <Header />
      
      <section className='max-padd-container py-10'>
        <h3 className='h3'> Add a Property </h3>
        <form onSubmit={handlePost}>
            <h4 className='h4 my-4'>Describe Your Property</h4>
            {/*  Categories container */}
                <div className='hide-scrollbar flex gap-x-1 bg-white ring-1 ring-slate-400/5 shadow-sm rounded-full px-2 py-3 overflow-x-auto mb-8' >
                    {categories.map((item) => (
                      <div key={item.label} onClick={() => setCategory(item.label)} className='flexCenter flex-col gap-2 p-2 rounded-xl cursor-pointer min-w-24 xl:min-w-32' style={{flexShrink:0}}>
                        <div className='text-secondary rounded-full h-10 w-10 p-2 flexCenter text-lg' style={{backgroundColor: `${item.color}`}}>{item.icon}</div>
                        <p className={`${category === item.label ? "text-secondary": ""} medium-14`}>{item.label}</p>
                      </div>
                    ))}
                </div>
                {/* container Types and locations */}
                <div className='flex flex-col gap-x-16 xl:flew-row'>
                    <div className='flex-1'>
                        {/*Types of place */}
                        <h4 className='h4 my-4'>What is the type of your place?</h4>
                        <div className='flex flex-col gap-y-3 mb-6'>
                            {types.map((item) => (
                                <div key={item.name} onClick={() => setType(item.name)} className={`${type === item.name ? "ring-1 ring-slate-900/50" : "ring-1 ring-slate-900/5"} flexbetween max-w-[777px] rounded-xl px-4 py-1`}>
                                    <div>
                                        <h5 className='h5' >{item.name}</h5>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className='text-2xl'>{item.icon}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* place locations  */}
                    <div className='flex-1 mb-4'>
                        <h4 className='h4 my-4'>what's the address of your place? </h4>
                        <div>
                            <div>
                                <h5 className='h5'>Street Adress:</h5>
                                <input onChange={handleChangeLocation}  value={formLocation.streetAddress} type="text" name='streetAddress' placeholder='Street' required className='bg-white text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5' />
                            </div>
                        </div>
                        <div className='flex gap-6'>
                            <div className='w-1/2'>
                                <h5 className='h5'>Apartment, Suite (opt):</h5>
                                <input onChange={handleChangeLocation} value={formLocation.aptSuite} type="text" name='aptSuite' placeholder='Apt, Suite (opt)' required className='bg-white text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5' />
                            </div>
                            <div className='w-1/2'>
                                <h5 className='h5'>City:</h5>
                                <input onChange={handleChangeLocation}  value={formLocation.city} type="text" name='city' placeholder='City' required className='bg-white text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5' />
                            </div>
                        </div>
                        <div className='flex gap-6 '>
                            <div className='w-1/2'>
                                <h5 className='h5'>Province:</h5>
                                <input onChange={handleChangeLocation}  value={formLocation.province} type="text" name='province' placeholder='Province' required className='bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5 ' />
                            </div>
                            <div className='w-1/2'>
                                <h5 className='h5'>Country:</h5>
                                <input onChange={handleChangeLocation} value={formLocation.country} type="text" name='country' placeholder='Country' required className='bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-slate-900/5' />
                            </div>
                        </div>
                    </div>
                </div>
            {/*  Essentials */} 
            <h4 className='h4 my-4'>Provide some essentials details about your place?</h4>  
            <div className='flex flex-wrap gap-4 mb-6'>
                <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 py-2 rounded'>
                    <h5>Guests</h5>
                    <div className='flexCenter gap-x-2 bg-white'>
                        <FaMinus onClick={() => (
                            guestCount > 1 && setGuestCount(guestCount - 1) )} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                            <p>{guestCount} </p>
                        <FaPlus onClick={() => setGuestCount(guestCount + 1)} className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer' />
                    </div>
                </div>
                <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 py-2 rounded'>
                    <h5>Bedrooms</h5>
                    <div className='flexCenter gap-x-2 bg-white'>
                        <FaMinus onClick={() => ( bedroomCount > 1 && setBedroomCount(bedroomCount - 1) )} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                            <p>{bedroomCount} </p>
                        <FaPlus onClick={() => setBedroomCount(bedroomCount + 1)} className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer' />
                    </div>
                </div>
                <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 py-2 rounded'>
                    <h5>Beds</h5>
                    <div className='flexCenter gap-x-2 bg-white'>
                        <FaMinus onClick={() => ( bedCount > 1 && setBedCount(bedCount - 1) )} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                            <p>{bedCount} </p>
                        <FaPlus onClick={() => setBedCount(bedCount + 1)} className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer' />
                    </div>
                </div>
                <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 py-2 rounded'>
                    <h5>bathrooms</h5>
                    <div className='flexCenter gap-x-2 bg-white'>
                        <FaMinus onClick={() => ( bathroomCount > 1 && setBathroomCount(bathroomCount - 1) )} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                            <p>{bathroomCount} </p>
                        <FaPlus onClick={() => setBathroomCount (bathroomCount + 1)} className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer' />
                    </div>
                </div>
            </div>
            <div className='my-10'>
                <h4 className='h4 my-4'>Describe about the features of your location? </h4>
                <ul className='flex items-center flex-wrap gap-3 mb-10'>
                    {facilities.map((card)=>(
                        <li key={card.name} onClick={() => handleSelectAmenities(card.name)} className={`${amenities.includes(card.name) ? "ring-1 ring-slate-900/5" : "ring-1 ring-slate-900/50"} flex items-center gap-3 bg-white p-4 rounded cursor-default`}>
                            <div>{card.icon} </div>
                            <p>{card.name}</p>
                        </li>
                    ))}
                </ul>
                {/* upload image */}
                <h4 className='h-4 m-6'>Include images showcasing your property?</h4>
                <DragDropContext onDragEnd={handleDragPhoto}>
                    <Droppable droppableId="photos" direction="horizontal" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
                        {(provided) => ( <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ld:grid-cols-5 xl:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg shadow-lg ' {...provided.droppableProps} ref={provided.innerRef} >
                            {photos.length < 1 &&(
                                <>
                                  <input type='file' name='image' accept='image/*' onChange={handleUploadPhotos} multiple id='imageUpload' className='hidden' /> 
                                  <label htmlFor="imageUpload" className='group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer'> 
                                    <div className='h-52 w-full flexCenter'> 
                                        <IoIosImages className='text-6xl text-gray-400 group-hover:text-gray-600 transition-colors'/>
                                        </div>
                                        <p className='text-gray-500 group-hover:text-gray-700'>Upload from your devide</p>
                                  </label> 
                                </> 
                            )} 
                            {photos.length >= 1 && (
                                <>
                                   {photos.map((photo, index) => {
                                    return (
                                    <Draggable key={index} draggableId={index.toString()} index={index} >
                                        {(provided) => (
                                            <div ref={provided.innerRef} 
                                            {...provided.dragHandleProps}
                                            className='relative group'>
                                                <img src={URL.createObjectURL(photo)} alt="property" className='aspect-square object-cover h-52 w-full rounded-lg shadow-md ' />
                                                <button type='button' className='absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200 ' onClick={()=> handleRemovePhoto(index)} >
                                                    <BiTrash className='text-red-500'/>
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                    );
                                })}
                                 <input type='file' id="imageUpload" accept="image/*" onChange={handleUploadPhotos} multiple className="hidden" />
                                 <label htmlFor="imageUpload" className='group flexCenter flex-col border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer'>
                                 <div className='h-52 w-full flexCenter'> 
                                        <IoIosImages className='text-6xl text-gray-400 group-hover:text-gray-600 transition-colors'/>
                                        </div>
                                        <p className='text-gray-500 group-hover:text-gray-700'>Upload more photos</p>
                                 </label>
                            </>
                            )}
                            {provided.placeholder}
                            </div>
                         )} 
                    </Droppable>
                </DragDropContext>
                <h4 className='h4 my-5'>How would your characterize the charm and exicitement of your property? </h4>
                <div>
                    <h5 className='h5'>Title</h5>
                    <input onChange={handleChangeDescription} value={formDescription.title} type="text" name="title" placeholder='Title' required className='bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5 w-full'/>
                    <h5 className='h5'>Description: </h5>
                    <textarea onChange={handleChangeDescription} value={formDescription.description} name="description" rows={10} placeholder='Description' required className='bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5 w-full resize-none'/>
                    <input onChange={handleChangeDescription} value={formDescription.price} type="number" name='price' placeholder='100' required className='bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5'/>
                </div>
            </div>
            <button type='submit' className='btn-secondary rounded-full'>Create Property</button>
        </form>
      </section>
    </>
  );
};

export default CreateListing;