import { useParams } from "react-router-dom";
import { useState, useEffect, useRef} from "react";
import { useSelectPosts } from '../../state/postsHooks';
import { Post } from "../../state/postSlice";
import PostContentEditor from "./PostContentEditor";
import PostSavePublishButtons from "./PostSavePublishButtons";
import IPhoneMockup from "./iPhoneMockup";
import axios from "axios";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ChoosePlatform from "../../../../pages/ChoosePlatform";


const PostEditor = () => {
  const { postId } = useParams();
  const posts = useSelectPosts();
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<string>(''); 
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);



  // const [imageUrl, setImageUrl] = useState<string | null>(null);


  const foundPost = posts.find((post: Post) => post.id === Number(postId));

  useEffect(() => {
    if (foundPost) {
      setContent(foundPost.content || '');
    }
  }, [foundPost]);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = async () => {
            if (foundPost) {
                try {
                    setIsSaving(true);
                    const formData = new FormData();
                    formData.append('content', content || '');

                    const response = await axios.put(
                        `http://localhost:5001/api/posts/edit/${foundPost.id}`, 
                        formData,
                        { 
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                            withCredentials: true 
                        }
                    );
    
                    console.log('Post updated:', response.data);
                    setIsSaving(false);
                } catch (error) {
                    console.error('Error updating post:', error);
                    setIsSaving(false);
                }
            }
        };
        const handlePublish = async () => {
          if (foundPost) {
            try {
              setIsSaving(true);
              setShowOverlay(true);
              await navigator.clipboard.writeText(content || '');
              console.log('Content copied to clipboard');
              setIsSaving(false);
            } catch (error) {
              console.error('Error publishing post:', error);
              setIsSaving(false);
            }
          }
        };

        const handleClickOutside = (event:any) => {
          if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            setShowOverlay(false); 
          }
        };

        useEffect(() => {
          if (showOverlay) {
            document.addEventListener("mousedown", handleClickOutside);
          } else {
            document.removeEventListener("mousedown", handleClickOutside);
          }
          return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [showOverlay]);

  return (
    <div className="post-editor-container">

      <div ref={overlayRef}>
        <ChoosePlatform isOpen={showOverlay}/>
      </div>

      <div className="post-editor-content">
        <div className="post-editor-left">
          {foundPost ? (
            <>
              <div className="post-content-editor">
                <PostContentEditor content={content} setContent={setContent} onChange={handleContentChange} />
              </div>

              <div className="post-editor-buttons" style={{position:"absolute", top:"16px", right:"24px"}}>
                <PostSavePublishButtons isSaving={isSaving} onSave={handleSave} onPublish={handlePublish}  />
              </div>

            </>
          ) : (
            <p>Post not found</p>
          )}
        </div>

        <div className="post-editor-right">

        <div className="device-icons-container">
            <LaptopMacIcon fontSize="small" />
            <TabletMacIcon fontSize="small" />
            <PhoneIphoneIcon fontSize="small" />
        </div>

          <IPhoneMockup content={content}/>
        </div>
      </div>

    </div>
  );
};

export default PostEditor