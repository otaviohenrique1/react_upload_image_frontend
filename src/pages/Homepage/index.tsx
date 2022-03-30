import { Button, ButtonGroup, Col, Container, Row } from "reactstrap";
import { ImageListType } from "react-images-uploading";
import { useState } from "react";
import { Dropzone } from "../../components/Dropzone";
import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers } from "formik";
import api from "../../utils/api";

interface FormTypes {
  nome: string;
  imagem: File[];
}

const valoresIniciais: FormTypes = {
  nome: "",
  imagem: [],
};

const validacaoSchema = Yup.object().shape({
  nome: Yup.string().required('Campo vazio'),
  imagem: Yup.array(),
  // imagem: Yup.array().of(
  //   Yup.mixed()
  // ),
});

export function Homepage() {
  // const [images, setImages] = useState<File[]>([]);
  // const [images2, setImages2] = useState<File[]>([]);
  const [images2, setImages2] = useState([]);
  // const [images2, setImages2] = useState<any[]>([]);

  async function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    let nome = values.nome;
    let lista_imagens = values.imagem;
    // console.log(`Nome: ${nome}`);
    // console.log('lista_imagens:');
    // console.log(lista_imagens);
    const data = new FormData();
    data.append('nome', nome);
    lista_imagens.forEach(imagem => {
      data.append('imagem', imagem);
    });

    await api.post('/item', data)
      .then(() => {
        alert('salvo');
        console.log('salvo');
      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  return (
    <Container className="p-3">
      <Formik
        initialValues={valoresIniciais}
        onSubmit={onSubmit}
        validationSchema={validacaoSchema}
      >
        {({ errors, touched, values, setFieldValue, resetForm }) => (
          <Form encType="multipart/form-data">
            <Row>
              <Col md={12} className="mb-2">
                <h1 className="w-100 text-center">Cadastro de fotos</h1>
              </Col>
              <Col md={12}>
                <Row>
                  <Col md={12} className="mb-2">
                    <Field
                      value={values.nome}
                      name="nome"
                      id="nome"
                      placeholder="nome"
                      className="form-control"
                    />
                  </Col>
                  <Col md={12}>
                    {(errors.nome && touched.nome) && (<p>{errors.nome}</p>)}
                  </Col>
                </Row>
              </Col>
              <Col md={12} className="mb-2">
                <Dropzone
                  multiple
                  maxNumber={3}
                  onChange={(imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
                    setImages2(imageList as never[]);
                    let lista_imagens = imageList.map((item) => {
                      return item.file;
                    });
                    setFieldValue("imagem", lista_imagens)
                  }}
                  value={images2}
                  maxFileSize={3000000}
                  acceptType={['jpg', 'gif', 'png']}
                />
              </Col>
              <Col md={12}>
                <ButtonGroup>
                  <Button type="submit" color="primary">Salvar</Button>
                  <Button type="reset" color="danger">Limpar</Button>
                  {/* <Button
                    type="button"
                    color="danger"
                    onClick={() => {
                      resetForm();
                    }}
                  >Limpar2</Button> */}
                </ButtonGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
}