import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true, 
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const savedConsent = localStorage.getItem("cookieConsent");
        if (!savedConsent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = () => {
        const allEnabled = { essential: true, analytics: true, marketing: true };
        saveConsent(allEnabled);
    };

    const handleDeclineAll = () => {
        const allDisabled = { essential: true, analytics: false, marketing: false };
        saveConsent(allDisabled);
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };

    const saveConsent = (settings) => {
        localStorage.setItem("cookieConsent", JSON.stringify(settings));
        setIsVisible(false);
       
    };

    const togglePreference = (key) => {
        if (key === "essential") return;
        setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-50 p-4 bg-white rounded-xl shadow-2xl border border-gray-100 animate-slide-up">
            <div className="max-w-none mx-auto">
                {!showDetails ? (
                    // Simple Banner
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1 text-sm text-gray-600">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                We value your privacy
                            </h3>
                            <p>
                                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                                <Link to="/privacy-policy" className="text-indigo-600 hover:text-indigo-500 ml-1 underline">
                                    Read our Privacy Policy
                                </Link>
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 shrink-0">
                            <button
                                onClick={() => setShowDetails(true)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Customize
                            </button>
                            <button
                                onClick={handleDeclineAll}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Reject All
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                ) : (
                    // Detailed Preferences
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="text-lg font-bold text-gray-900">Cookie Preferences</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage your cookie settings. You can always change these later.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Essential */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="text-sm font-medium text-gray-900">Essential Cookies</span>
                                    <p className="text-xs text-gray-500">Required for the website to function (e.g., login sessions).</p>
                                </div>
                                <div className="ml-4">
                                    <input
                                        type="checkbox"
                                        checked={true}
                                        disabled
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded opacity-50 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Analytics */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="text-sm font-medium text-gray-900">Analytics</span>
                                    <p className="text-xs text-gray-500">Help us improve our website by collecting usage data.</p>
                                </div>
                                <div className="ml-4">
                                    <input
                                        type="checkbox"
                                        checked={preferences.analytics}
                                        onChange={() => togglePreference('analytics')}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Marketing */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="text-sm font-medium text-gray-900">Marketing</span>
                                    <p className="text-xs text-gray-500">Used to display personalized advertisements.</p>
                                </div>
                                <div className="ml-4">
                                    <input
                                        type="checkbox"
                                        checked={preferences.marketing}
                                        onChange={() => togglePreference('marketing')}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setShowDetails(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSavePreferences}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                            >
                                Save Preferences
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CookieConsent;
