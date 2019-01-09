import { ParentChildArraySharedPipe } from '@web/app/shared/pipes/parent-child-array-shared.pipe';
import { FetchStringInArraySharedPipe } from '@web/app/shared/pipes/fetch-string-in-array-shared.pipe';
import { MyTranslatePipe } from '@web/app/shared/pipes/my-translate.pipe';
import { TransformTextSharedPipe } from '@web/app/shared/pipes/transform-text-shared.pipe';

export const pipes: any[] = [
  ParentChildArraySharedPipe,
  FetchStringInArraySharedPipe,
  MyTranslatePipe,
  TransformTextSharedPipe
];
