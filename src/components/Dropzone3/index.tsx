import ImageUploading, { ImageListType } from "react-images-uploading";
import { GrUpdate } from "react-icons/gr";
import { MdSystemUpdateAlt } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { Alert, Button, ButtonGroup, Card, CardFooter, CardGroup, CardImg } from "reactstrap";
import styled from "styled-components";

interface Dropzone3Props {
  value: ImageListType;
  onChange: (value: ImageListType, addUpdatedIndex?: number[] | undefined) => void;
  maxNumber?: number;
  multiple?: boolean;
  maxFileSize?: number;
  acceptType?: string[];
}

export function Dropzone3(props: Dropzone3Props) {
  return (
    <ImageUploading
      multiple={props.multiple}
      value={props.value}
      onChange={props.onChange}
      maxNumber={props.maxNumber}
      maxFileSize={props.maxFileSize}
      acceptType={props.acceptType}
    >
      {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (
        <div className="upload__image-wrapper">
          <button
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click ou Arraste imagens aqui <MdSystemUpdateAlt size={30} />
          </button>
          &nbsp;
          <button onClick={onImageRemoveAll}>Remover todas as imagens</button>
          {errors && <div>
            {errors.maxNumber && <Alert color="danger" className="w-100">
              Numero maximo de imagems atingido. Maximo: {props.maxNumber}
            </Alert>}
            {errors.acceptType && <Alert color="danger" className="w-100">
              Tipo não aceito de imagem. Aceitos: {props.acceptType?.join(',')}
            </Alert>}
            {errors.maxFileSize && <Alert color="danger" className="w-100">
              Tamanho maximo de arquivo exedido. Tamanho maximo: {(props.maxFileSize) ? props.maxFileSize / 1000000 : 0} mb
            </Alert>}
            {/* {errors.resolution && <span>
              Selected file is not match your desired resolution
            </span>} */}
          </div>}
          <CardGroup>
            {imageList.map((image, index) => (
              <CardEstilizado key={index}>
                <CardImgEstilizado src={image.dataURL} alt={`imagem-${index}`} />
                <CardFooter className="p-0 m-0">
                  <ButtonGroup className="w-100">
                    <Button
                      className="ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center"
                      color="primary"
                      onClick={() => onImageUpdate(index)}
                    >
                      <GrUpdate size={20} className="p-0 m-0" />
                    </Button>
                    <Button
                      className="ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center"
                      color="danger"
                      onClick={() => onImageRemove(index)}
                    >
                      <AiOutlineDelete size={20} className="p-0 m-0" />
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </CardEstilizado>
            ))}
          </CardGroup>
        </div>
      )}
    </ImageUploading>
  );
}

const CardEstilizado = styled(Card)`
  width: 168px !important;
  /* height: 150px; */
`;

const CardImgEstilizado = styled(CardImg)`
  width: 168px !important;
`;