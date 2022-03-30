import { Col, Container, Row } from "reactstrap";
import { ImageListType } from "react-images-uploading";
import { useState } from "react";
import { Dropzone } from "../../components/Dropzone";

export function Homepage() {
  const [images, setImages] = useState([]);
  const maxNumber = 3;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <Container className="p-3">
      <Row>
        <Col md={12}>
          <Dropzone
            multiple
            maxNumber={maxNumber}
            onChange={onChange}
            value={images}
            maxFileSize={3000000}
            acceptType={['jpg', 'gif', 'png']}
          />
        </Col>
      </Row>
    </Container>
  );
}