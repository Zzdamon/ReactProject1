import React from 'react';
import PostItem from './PostItem'
// function PostList(props){
//     // const {posts}=props;
//     const posts=[];
//     fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(data => {
//       data = data.filter(post => post.id < 6);
//       data.forEach(post => {
//         // user.isGoldClient = false;
//         // user.image="https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Avatar_icon_green.svg/1024px-Avatar_icon_green.svg.png";
//         // user.salary=0;
//         posts.push(post);
//     });

//     return(
//         <div>
//             {
//                 posts.map()
//             }
//         </div>
//     )
// }

class PostList extends React.Component{
    constructor(){
        super();
        this.state={
            posts:[]
        }
        
    //   data.forEach(post => {
        // user.isGoldClient = false;
        // user.image="https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Avatar_icon_green.svg/1024px-Avatar_icon_green.svg.png";
        // user.salary=0;
        // posts.push(post);
    // });
    }

    render(){
        fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      data = data.filter(post => post.id < 6);
      this.setState({
          posts: data
      });
    });

        return(
        <div> <h2>Lista postari: </h2>
        {this.state.posts.map((post)=>{
            return <PostItem title={post.title} body={post.body} /> 
        
             })}
        </div>
        )
    }
    
}
export default PostList;