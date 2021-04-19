/**
 * @file This file unit tests for the USPTO patent converter code for Version 4
 * of the USPTO patent data.
 * 
 * @author Anthony Mancini
 * @version 2.0.0
 * @license AGPLv3
 */

import * as fs from 'fs';
import * as path from 'path';
import test from 'ava';
import * as converters from './../converters';
import { UsptoPatentData } from '../interfaces';


test.before(async (avaTest: any) => {
  // Getting the sample data from the sample data folder
  const usptoVersion4FilePath: string = path.join(__dirname, '../../samples/usptoVersion4.xml');
  const usptoVersion4DataSample: string = fs.readFileSync(usptoVersion4FilePath).toString();

  // Converting the sample data into a unified format
  const usptoVersion4DataArray: UsptoPatentData[] = await converters.convertUsptoVersion4XmlDataToJs(usptoVersion4DataSample);

  // Getting the first value from the array as there is only a single patent sample within the
  // sample file
  const usptoVersion4Data: UsptoPatentData = usptoVersion4DataArray.pop();

  // Checking that the values in the sample data match the expected values
  const usptoVersion4ActualData: UsptoPatentData = usptoVersion4Data;

  avaTest.context.usptoActualData = usptoVersion4ActualData;
});


test('Testing USPTO Version 4 Converter Value: applicationNumber', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.applicationNumber;
  const usptoExpectedValue: string = '8282966';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: language', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.language;
  const usptoExpectedValue: string = 'EN';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: country', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.country;
  const usptoExpectedValue: string = 'US';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: dateProduced', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.dateProduced;
  const usptoExpectedValue: string = '20120921';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: datePublished', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.datePublished;
  const usptoExpectedValue: string = '20121009';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: dtdVersion', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.dtdVersion;
  const usptoExpectedValue: string = 'v4.2 2006-08-23';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: fileName', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.fileName;
  const usptoExpectedValue: string = 'US08282966-20121009.XML';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: patentStatus', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.patentStatus;
  const usptoExpectedValue: string = 'PRODUCTION';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: patentClaims', async (avaTest: any) => {

  const usptoActualValue: number = avaTest.context.usptoActualData.patentClaims.length;
  const usptoExpectedValue: number = 29;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: inventionTitle', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.inventionTitle;
  const usptoExpectedValue: string = 'Methods of reducing the risk of occurrence of pulmonary edema in children in need of treatment with inhaled nitric oxide';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: inventionId', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.inventionId;
  const usptoExpectedValue: string = 'd2e51';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: company', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.company;
  const usptoExpectedValue: string = 'INO Therapeutics LLC';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 4 Converter Value: applicants', async (avaTest: any) => {

  const usptoActualValue: number = avaTest.context.usptoActualData.applicants.length;
  const usptoExpectedValue: number = 2;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});