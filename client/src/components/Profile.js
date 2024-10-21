import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {

    const navigate = useNavigate();
    const [savedArticles, setSavedArticles] = useState([]);
    let [userData, setUserData] = useState(null)
    
   
    useEffect(() => {
        const callProfilePage = async () => {
            try {
    
                const response = await fetch('/profile', {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "applications/json"
    
                    },
                    credentials: "include"
                })
    
                const data = await response.json();
                setUserData(data);
    
                if (response.status !== 200) {
                    const err = new Error("Didn't get response");
                    throw err;
                }
            } catch (error) {
                console.log(error);
                navigate('/login')
            }
        }

        const fetchSavedArticles = async () => {
            try {
                const response = await fetch('/saved-articles', {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });

                const articles = await response.json();
                setSavedArticles(articles); // Store saved articles
            } catch (error) {
                console.error("Error fetching saved articles:", error);
            }
        };


        callProfilePage();
        fetchSavedArticles();
    }, [navigate])

    //  Function to handle removing saved articles
    const handleRemoveArticle = async (url) => {
        try {
            const response = await fetch('/remove-article', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();
            if (response.status === 200) {
                // Remove the article from the state after successful removal
                setSavedArticles(savedArticles.filter(article => article.url !== url));
                alert(data.message);
            } else {
                alert("Failed to remove the article.");
            }
        } catch (error) {
            console.error("Error removing article:", error);
        }
    };



    return (
        <section className="profile-section container py-5">
            <div className="profile-details row justify-content-center">
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgKQAcCkbDxBN-U9wTuIQQcP30FUkWvOrFGg&s"
                                alt="avatar"
                                className="rounded-circle img-fluid"
                            />
                            <h5 className="my-3">{userData && userData.firstName} {userData && userData.lastName}</h5>
                            <div>
                                <p><strong>Email:</strong> {userData && userData.email}</p>
                                <p><strong>Phone:</strong> {userData && userData.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Saved Articles Section Outside the Profile Box */}
            <div className="saved-articles-section">
                <h4 className="text-center">Saved Articles</h4>
                <div className="row justify-content-center">
                    {savedArticles.length > 0 ? (
                        savedArticles.map((article, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card mb-4">
                                    <img src={article.urlToImage} className="card-img-top" alt={article.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.description}</p>
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
                                        <button className="btn btn-danger mt-2" onClick={() => handleRemoveArticle(article.url)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No saved articles yet.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Profile;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Profile() {
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null);
//     const [savedArticles, setSavedArticles] = useState([]);

//     useEffect(() => {
//         const callProfilePage = async () => {
//             try {
//                 const response = await fetch('/profile', {
//                     method: "GET",
//                     headers: {
//                         Accept: "application/json",
//                         "Content-Type": "application/json"
//                     },
//                     credentials: "include"
//                 });

//                 const data = await response.json();
//                 setUserData(data);

//                 if (response.status !== 200) {
//                     throw new Error("Profile page access failed");
//                 }
//             } catch (error) {
//                 console.log(error);
//                 navigate('/login');
//             }
//         };

//         // Fetch the saved articles
//         const fetchSavedArticles = async () => {
//             try {
//                 const response = await fetch('/saved-articles', {
//                     method: 'GET',
//                     headers: {
//                         Accept: "application/json",
//                         "Content-Type": "application/json"
//                     },
//                     credentials: 'include'
//                 });

//                 const articles = await response.json();
//                 setSavedArticles(articles); // Store saved articles
//             } catch (error) {
//                 console.error("Error fetching saved articles:", error);
//             }
//         };

//         callProfilePage();
//         fetchSavedArticles();
//     }, [navigate]);

//     // Function to handle removing saved articles
//     const handleRemoveArticle = async (url) => {
//         try {
//             const response = await fetch('/remove-article', {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ url })
//             });

//             const data = await response.json();
//             if (response.status === 200) {
//                 // Remove the article from the state after successful removal
//                 setSavedArticles(savedArticles.filter(article => article.url !== url));
//                 alert(data.message);
//             } else {
//                 alert("Failed to remove the article.");
//             }
//         } catch (error) {
//             console.error("Error removing article:", error);
//         }
//     };

//     return (
//         <>
//             <section className="profile-section">
//                 <div className="container py-5">
//                     <center>
//                         <div className="col-lg-4">
//                             <div className="card mb-4">
//                                 <div className="card-body text-center">
//                                     <img
//                                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgKQAcCkbDxBN-U9wTuIQQcP30FUkWvOrFGg&s"
//                                         alt="avatar"
//                                         className="rounded-circle img-fluid"
//                                     />
//                                     <h5 className="my-3">{userData && userData.firstName} {userData && userData.lastName}</h5>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col-lg-8">
//                             <div className="card mb-4">
//                                 <div className="card-body">
//                                     <h4>Saved Articles</h4>
//                                     <div className="saved-articles-container">
//                                         {savedArticles.length > 0 ? (
//                                             savedArticles.map((article, index) => (
//                                                 <div key={index} className="article-card">
//                                                     <img src={article.urlToImage} className="article-img" alt={article.title} />
//                                                     <div className="article-content">
//                                                         <h5>{article.title}</h5>
//                                                         <p>{article.description}</p>
//                                                         <a href={article.url} target="_blank" rel="noopener noreferrer"> </a>
//                                                         <button className="remove-btn" onClick={() => handleRemoveArticle(article.url)}>Remove</button>
//                                                     </div>
//                                                 </div>
//                                             ))
//                                         ) : (
//                                             <p>No saved articles yet.</p>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </center>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default Profile;
