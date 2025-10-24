 // Fetch persisted document content
 import axios from "../../apis/interceptor";
 import { UPDATE_DOCUMENT } from "../../apis/Endpoints";
import { DOCUMENTS } from "../../apis/Endpoints";
 export const GetDocumentContent = async (roomName : string ): Promise<string | undefined> => {
    try {
      const res = await axios.get(`${DOCUMENTS}/${roomName}`);
      if (res.status === 200) {
        console.log(res.data.data.DocumentDetails[0].operations)
        return res.data.data.DocumentDetails[0].operations;
      }
    } catch (err) {
      console.error('Error fetching document content', err);
    }
  };

 
  export const UpdateDocumentName = ( documentID : string ,newDocumentName : string ) =>{

    axios.put(`${UPDATE_DOCUMENT}`, {
        NewDocumentName  : newDocumentName
        , DocumentId : documentID        
    })

  }


  export const MakeAdmin = (documentid : string, userid :string  )=>{
    try {
        // axios.post()
    } catch (error) {
        
    }
  }