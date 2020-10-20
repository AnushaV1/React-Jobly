import React, { useState, useContext, useEffect, useRef} from "react";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";
import Alert from "./Alert";

const MESSAGE_SHOW_PERIOD_IN_MSEC = 3000;
const Profile = () => {
    const {user , setUser} = useContext(UserContext);
    const INITIAL_STATE = {
        username: user.username,
        password: "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        photo_url: user.photo_url || "",
        userSaved: false,
        errors: []
    }
    const [formData, setFormData] = useState(INITIAL_STATE)

    const messageShownRef = useRef(false);
    useEffect(
    function() {
        if (formData.userSaved && !messageShownRef.current) {
        messageShownRef.current = true;
        setTimeout(function() {
            setFormData(f => ({ ...f, userSaved: false }));
            messageShownRef.current = false;
        }, MESSAGE_SHOW_PERIOD_IN_MSEC);
        }
    }, [formData]);



    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]:value,
            userSaved: false
        }))
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            let profileData = {
                first_name: formData.first_name || undefined,
                last_name: formData.last_name || undefined,
				email: formData.email || undefined,
				photo_url: formData.photo_url || undefined,
				password: formData.password
            };
            let username = formData.username;
            let updatedUser  = await JoblyApi.updateUser(username, profileData)
            console.log("UPDATED USER", updatedUser)
            setFormData(f => ({
                ...f,
                errors: [],
                saveConfirmed: true,
                password: ""
            }));
            setUser(updatedUser);
        } catch (errors) {
            setFormData(f => ({ ...f, errors }));
        }
        }

    return (
        <form onSubmit={handleSubmit}>
            <div class="form-group">
    <label htmlfor="username">Username</label>
    <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange} />
    </div>
            <div class="form-group">
    <label htmlfor="username">First name</label>
    <input 	id='first_name' className='validate' name='first_name' value={formData.first_name} 	onChange={handleChange} />
    </div>
    <div class="form-group">
    <label htmlfor="last_name">Last name</label>
    <input type="text" name="last_name" placeholder="last_name" value={formData.last_name} onChange={handleChange} />
    </div>
    <div class="form-group">
    <label htmlfor="email">email</label>
    <input type="text" name="email" placeholder="email" value={formData.email} onChange={handleChange} />
    </div>
    <div class="form-group">
    <label htmlfor="photo_url">Photo URL</label>
    <input 	id='photo_url' type='text' name='photo_url' value={formData.photo_url} onChange={handleChange} />
    </div>
    <div class="form-group">
    <label htmlfor="password">Confirm password</label>
    <input 	id='password' type='password' name='password' value={formData.password} onChange={handleChange} />
    </div>
    {formData.errors.length ? (
            <Alert type="danger" messages={formData.errors} />
            ) : null}

            {formData.saveConfirmed ? (
            <Alert type="success" messages={["User updated successfully."]} />
            ) : null}

            <button className="btn btn-primary" onClick={handleSubmit}>
            Save Changes
            </button>
    </form>
    )
}

export default Profile;