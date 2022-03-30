import ImageUploading, { ImageListType } from "react-images-uploading";

interface Dropzone2Props {
  value: ImageListType;
  onChange: (value: ImageListType, addUpdatedIndex?: number[] | undefined) => void;
  maxNumber: number;
  multiple: boolean;
}

export function Dropzone2(props: Dropzone2Props) {
  return (
    <ImageUploading
      multiple={(props.multiple) ? true : false}
      value={props.value}
      onChange={props.onChange}
      maxNumber={props.maxNumber}
    >
      {({ imageList, dragProps, isDragging }) => (
        <div {...dragProps} className="border border-1 rounded-3 bg-info w-100 d-flex justify-content-center align-items-center fw-bold" style={{ height: '250px' }}>
          {isDragging ? "Arraste imagens aqui" : "Espaço de upload"}
          {imageList.map((image, index) => (
            <img key={index} src={image.data_url} alt={`imagem-${index}`} />
          ))}
        </div>
      )}
    </ImageUploading>
  );
}