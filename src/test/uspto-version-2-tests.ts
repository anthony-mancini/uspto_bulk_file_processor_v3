/**
 * @file This file unit tests for the USPTO patent converter code for Version 2
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
  const usptoVersion2FilePath: string = path.join(__dirname, '../../samples/usptoVersion2.xml');
  const usptoVersion2DataSample: string = fs.readFileSync(usptoVersion2FilePath).toString();

  // Converting the sample data into a unified format
  const usptoVersion2DataArray: UsptoPatentData[] = await converters.convertUsptoVersion2XmlDataToJs(usptoVersion2DataSample);

  // Getting the first value from the array as there is only a single patent sample within the
  // sample file
  const usptoVersion2Data: UsptoPatentData = usptoVersion2DataArray.pop();

  // Checking that the values in the sample data match the expected values
  const usptoVersion2ActualData: UsptoPatentData = usptoVersion2Data;

  avaTest.context.usptoActualData = usptoVersion2ActualData;
});


test('Testing USPTO Version 2 Converter Value: applicationNumber', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.applicationNumber;
  const usptoExpectedValue: string = 'D0468073';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: language', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.language;
  const usptoExpectedValue: string = null;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: country', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.country;
  const usptoExpectedValue: string = 'US';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: dateProduced', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.dateProduced;
  const usptoExpectedValue: string = '20030107';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: datePublished', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.datePublished;
  const usptoExpectedValue: string = '20010606';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: dtdVersion', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.dtdVersion;
  const usptoExpectedValue: string = '2.5';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: fileName', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.fileName;
  const usptoExpectedValue: string = null;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: patentStatus', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.patentStatus;
  const usptoExpectedValue: string = 'Build 20020918';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: patentClaims', async (avaTest: any) => {

  const usptoActualValue: number = avaTest.context.usptoActualData.patentClaims.length;
  const usptoExpectedValue: number = 1;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: inventionTitle', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.inventionTitle;
  const usptoExpectedValue: string = 'Popcorn ice cream';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: inventionId', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.inventionId;
  const usptoExpectedValue: string = 'Popcorn ice cream';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: company', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.company;
  const usptoExpectedValue: string = 'Dippin Dots, Inc.';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Version 2 Converter Value: applicants', async (avaTest: any) => {

  const usptoActualValue: number = avaTest.context.usptoActualData.applicants.length;
  const usptoExpectedValue: number = 1;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});