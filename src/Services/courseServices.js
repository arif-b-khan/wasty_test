const baseUrl = process.env.REACT_APP_API_URL;

export async function getCourses(){
    const response = await fetch(baseUrl+'courses');
    if(response.ok) return response.json();
    throw response;
}

export async function saveCourse(){

}