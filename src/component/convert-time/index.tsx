import moment from "moment";
import { Formik } from "formik";
import React, {  useCallback, useMemo, useState } from "react";
import * as FormikAntd from "formik-antd";
import { notification, Typography, } from "antd";
const { Title } = Typography;

export const ConvertTime = React.memo(() => {
  const [value, setValue] = useState<string>("")
  const initialValues = useMemo(
    () => ({
      seconds: "",
    }),
    []
  );

  const onSubmit = useCallback((values: typeof initialValues)=>{
    const result = moment(Number(values.seconds) * 1000).format(
      "dddd HH:mm:ss"
    )
    notification.open({
      message: result,
    });

    setValue(result);
  }, [setValue])
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {() => {
          return (
            <FormikAntd.Form layout={"vertical"}>
              <FormikAntd.Form.Item
                name={"seconds"}
                label={"Введите количество секунд (например: 1605717825)"}
              >
                <FormikAntd.Input name={"seconds"} 
                  type="number"  
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  required
                />
              </FormikAntd.Form.Item>{" "}
              <FormikAntd.Form.Item name={"submit"} colon={false}>
                <FormikAntd.SubmitButton
                  type="primary"
                  htmlType="submit"
                  loading={false}
                >
                  Конвертировать
                </FormikAntd.SubmitButton>
              </FormikAntd.Form.Item>
            </FormikAntd.Form>
          );
        }}
      </Formik>
      <Title level={2}>{value}</Title>

    </>
  );
});
