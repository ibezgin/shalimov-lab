import moment from "moment";
import { Formik } from "formik";
import React, {  useMemo } from "react";
import * as FormikAntd from "formik-antd";
import { notification, } from "antd";

export const ConvertTime = React.memo(() => {
  const initialValues = useMemo(
    () => ({
      seconds: "",
    }),
    []
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        notification.open({
          message: moment(Number(values.seconds) * 1000).format(
            "dddd HH:mm:ss"
          ),
        });
      }}
    >
      {() => {
        return (
          <FormikAntd.Form layout={"vertical"}>
            <FormikAntd.Form.Item
              name={"seconds"}
              label={"Введите количество секунд (например: 1605717825)"}
            >
              <FormikAntd.Input name={"seconds"} required type="number" />
            </FormikAntd.Form.Item>{" "}
            <FormikAntd.Form.Item name={"submit"} colon={false}>
              <FormikAntd.SubmitButton
                type="primary"
                htmlType="submit"
                loading={false}
              >
                Submit
              </FormikAntd.SubmitButton>
            </FormikAntd.Form.Item>
          </FormikAntd.Form>
        );
      }}
    </Formik>
  );
});
