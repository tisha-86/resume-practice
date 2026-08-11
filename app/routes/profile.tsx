import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
    { title: "Resumind | Profile" },
    { name: "description", content: "Manage your profile details" },
];

const PROFILE_KEY = "user:profile";

const Profile = () => {
    const { auth, isLoading, kv } = usePuterStore();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<UserProfile>({
        name: "",
        phone: "",
        email: "",
        location: "",
        linkedin: "",
        github: "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState("");

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/profile`);
    }, [isLoading]);

    useEffect(() => {
        const loadProfile = async () => {
            const saved = await kv.get(PROFILE_KEY);
            if (saved) {
                setProfile(JSON.parse(saved));
            }
        };
        loadProfile();
    }, []);

    const handleChange = (field: keyof UserProfile, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveStatus("");

        const success = await kv.set(PROFILE_KEY, JSON.stringify(profile));

        setIsSaving(false);
        setSaveStatus(success ? "Profile saved successfully!" : "Failed to save profile.");

        setTimeout(() => setSaveStatus(""), 3000);
    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Your Profile</h1>
                    <h2>Keep your details up to date for better resume generation</h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 max-w-2xl mx-auto w-full pb-16"
                >
                    <div className="form-div">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your full name"
                            value={profile.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </div>

                    <div className="form-div">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={profile.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>

                    <div className="form-div">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="+8801XXXXXXXXX"
                            value={profile.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>

                    <div className="form-div">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            placeholder="Dhaka, Bangladesh"
                            value={profile.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                        />
                    </div>

                    <div className="form-div">
                        <label htmlFor="linkedin">LinkedIn</label>
                        <input
                            type="text"
                            id="linkedin"
                            placeholder="linkedin.com/in/username"
                            value={profile.linkedin}
                            onChange={(e) => handleChange("linkedin", e.target.value)}
                        />
                    </div>

                    <div className="form-div">
                        <label htmlFor="github">GitHub</label>
                        <input
                            type="text"
                            id="github"
                            placeholder="github.com/username"
                            value={profile.github}
                            onChange={(e) => handleChange("github", e.target.value)}
                        />
                    </div>

                    <button className="primary-button" type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Profile"}
                    </button>

                    {saveStatus && (
                        <p className="text-center text-sm text-gray-600">{saveStatus}</p>
                    )}
                </form>
            </section>
        </main>
    );
};

export default Profile;