import React, {useState} from 'react'


// Sub Component imports
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditMaterialsGrid from './EditCraft/EditMaterialsGrid'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// Image Imports

// it turns out that import on a img gives a session url
import imgDefault from '../images/editImageDefault.png';

const EditCraft = () => {
    const [imgUrl, setImgUrl] = useState(imgDefault);
    const loadImg = (e) => {
      const image = e.target.files[0];
      const blobUrl = URL.createObjectURL(image);
      setImgUrl(blobUrl);
      console.log(e)
    }

    return(
        <Card sx={{ maxWidth: 800 , minHeight:500 }}>
            <CardContent>
            <TextField
              required
              id="outlined-required"
              label="Título"
              defaultValue="Nombre del proyecto"
            />
            <input type='file' onChange={loadImg}/>
            <img src={imgUrl} ></img>
                <EditMaterialsGrid/>
            </CardContent>
        </Card>
    )
}

export default EditCraft;

/*
<Box>
                  <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
*/