import { PublishOutlined } from "@mui/icons-material";
import CustomIconButton from "../../../../components/Buttons/CustomIconButton";
import { PublishListRowType } from ".";
import { PostPublishRequest } from "../../../../hooks/api-hooks/admin/use-post-publish-list";
import { ColorsType } from "../../../../hooks/use-colors";

type Props = {
  row: PublishListRowType;
  colors: ColorsType;
  handlePublishActionClick: (data: PostPublishRequest) => void;
};

export function renderActions({
  row,
  colors,
  handlePublishActionClick,
}: Props) {
  const {
    tender_no,
    tender_date,
    season,
    grade,
    quantal,
    lifting_date,
    purchase_rate,
    mill_rate,
    mc,
    pt,
    item_code,
    ic,
    tender_id,
    td,
    sale_rate,
    tender_do,
    mill_code,
    payment_to,
    mill_short_name,
    item_name
  } = row;
  const data = {
    tender_no,
    tender_date,
    season,
    grade,
    quantal,
    lifting_date,
    purchase_rate,
    mill_rate,
    mc,
    pt,
    item_code,
    ic,
    tender_id,
    td,
    unit: "Q",
    sale_rate,
    publish_quantal: 0,
    multiple_of: 160,
    auto_confirm: "Y",
    tender_do,
    type: "F",
    mill_code,
    payment_to,
    mill_short_name,
    item_name
  } as PostPublishRequest;
  return (
    <CustomIconButton
      description={`Publish Item ${row.tender_id}`}
      color={colors.blue[500]}
      hoverBackgroundColor={colors.blue[600]}
      onClick={() => handlePublishActionClick(data)}
    >
      <PublishOutlined />
    </CustomIconButton>
  );
}
