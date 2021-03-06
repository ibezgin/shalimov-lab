import { Formik } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import * as FormikAntd from "formik-antd";
import { Card, notification, Progress, Typography } from "antd";
const { Title } = Typography;

export const Comparison = React.memo(() => {
  const [percent, setPercent] = useState<number>(0);

  const initialValues = useMemo(
    () => ({
      firstString: "",
      secondString: "",
    }),
    []
  );

  const levenshtein = (s1: string, s2: string, costs?: any) => {
    var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
    l1 = s1.length;
    l2 = s2.length;

    costs = costs || {};
    var cr = costs.replace || 1;
    var cri = costs.replaceCase || costs.replace || 1;
    var ci = costs.insert || 1;
    var cd = costs.remove || 1;

    cutHalf = flip = Math.max(l1, l2);

    var minCost = Math.min(cd, ci, cr);
    var minD = Math.max(minCost, (l1 - l2) * cd);
    var minI = Math.max(minCost, (l2 - l1) * ci);
    var buf = new Array(cutHalf * 2 - 1);

    for (i = 0; i <= l2; ++i) {
      buf[i] = i * minD;
    }

    for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
      ch = s1[i];
      chl = ch.toLowerCase();

      buf[flip] = (i + 1) * minI;

      ii = flip;
      ii2 = cutHalf - flip;

      for (j = 0; j < l2; ++j, ++ii, ++ii2) {
        cost = ch === s2[j] ? 0 : chl === s2[j].toLowerCase() ? cri : cr;
        buf[ii + 1] = Math.min(
          buf[ii2 + 1] + cd,
          buf[ii] + ci,
          buf[ii2] + cost
        );
      }
    }
    return buf[l2 + cutHalf - flip];
  };

  const onSubmit = useCallback((values: typeof initialValues) => {
    const firstLength = values.firstString.length;

    const secondLength = values.secondString.length;

    const maxLength = firstLength > secondLength ? firstLength : secondLength;

    const levenshteinResult = levenshtein(
      values.firstString,
      values.secondString
    );
    if (!levenshteinResult) {
      setPercent(100);
    }
    const coefficient = levenshteinResult / maxLength;
    console.log({ maxLength });
    console.log({ levenshteinResult });
    console.log({ coefficient });

    const result = (1 - coefficient) * 100;

    setPercent(result);

    notification.open({ message: `Cтроки совпадают на ${result}%` });
    //code
  }, []);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => {
          return (
            <FormikAntd.Form layout={"vertical"}>
              <FormikAntd.Form.Item
                name={"firstString"}
                label={"Введите первую строку"}
              >
                <FormikAntd.Input name={"firstString"} 
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  required
                />
              </FormikAntd.Form.Item>{" "}
              <FormikAntd.Form.Item
                name={"secondString"}
                label={"Введите вторую строку строку"}
              >
                <FormikAntd.Input name={"secondString"}                   
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  required
                />
              </FormikAntd.Form.Item>
              <FormikAntd.Form.Item name={"submit"} colon={false}>
                <FormikAntd.SubmitButton
                  type="primary"
                  htmlType="submit"
                  loading={false}
                >
                  Сравнить
                </FormikAntd.SubmitButton>
              </FormikAntd.Form.Item>
            </FormikAntd.Form>
          );
        }}
      </Formik>
      <Card title="Совпадение строк в процентном соотношении:" bordered={false} style={{ width: 400 }}>
        <Progress percent={percent} type="circle" width={250} format={percent => `${percent}%`} />
      </Card>
      {/* <Title level={4} >Совпадение строк в процентном соотношении:</Title> */}
      {/* <Progress percent={percent} type="circle" width={400} format={percent => percent===100 ? "Совпадают" : `${percent}%`} /> */}
    </>
  );
});
