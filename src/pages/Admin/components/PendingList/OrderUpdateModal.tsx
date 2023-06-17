// import { FC } from 'react'
// import { useColors } from '../../../../hooks/use-colors';
// import { SxProps } from '@mui/material';
// import { Theme } from '@emotion/react';

// interface OrderUpdateModalProps {
  
// }

// const OrderUpdateModal: FC<OrderUpdateModalProps> = (props) => {
//     const colors = useColors();
//     const labelStyle = {
//         textTransform: "uppercase",
//         fontWeight: 500,
//         color: colors.textColor[600],
//         width: "auto",
//         display: "flex",
//         alignItems: "center",
//       } as SxProps<Theme>;
    
//       const valueStyle = {
//         color: colors.textColor[300],
//         fontWeight: 400,
//         overflowX: "auto",
//         display: "flex",
//         alignItems: "center",
//       } as SxProps<Theme>;
    
//       // React query
//       const placeOrderMutation = usePlaceOrder();
    
//       const handlePlaceOrder = () => {
//         if (!orderData) return;
//         if (!orderQuantity) {
//           fail("Please select quantity");
//           return;
//         }
//         placeOrderMutation.mutate({ ...orderData, qty: parseInt(orderQuantity) });
//         setOpen(false);
//       };
    
//       const { loading, loadingText } = useMemo(() => {
//         let loadingText = "loading";
//         if (placeOrderMutation.isLoading) {
//           loadingText = "placing";
//         }
//         return {
//           loading: placeOrderMutation.isLoading,
//           loadingText,
//         };
//       }, [placeOrderMutation.isLoading]);
    
//       return (
//         <Modal open={open}>
//           <div>
//             <TextLoader loading={loading} loadingText={loadingText} />
//             <Card
//               sx={{
//                 width: 800,
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 display: "flex",
//                 flexDirection: "column",
//                 px: 2,
//                 pt: 0,
//                 maxHeight: "100vh",
//                 overflowY: "auto",
//               }}
//             >
//               <HeaderCard
//                 title="Order"
//                 subtitle="Please place your order"
//                 buttonBox={
//                   <CustomIconButton
//                     color={colors.red[500]}
//                     hoverBackgroundColor={colors.red[400]}
//                     description="Close"
//                     onClick={() => setOpen(false)}
//                   >
//                     <CancelOutlined />
//                   </CustomIconButton>
//                 }
//               />
//               <Divider />
//               <Grid container px={2} spacing={2} rowGap={2} sx={{ mt: 1 }}>
//                 <Grid item display="flex" xs={12} md={6} gap={2}>
//                   <Typography sx={labelStyle}>Mill Name </Typography>
//                   <Typography sx={valueStyle}>
//                     {publishedListItem.mill_short_name}
//                   </Typography>
//                 </Grid>
//                 <Grid item display="flex" xs={12} md={6} gap={2}>
//                   <Typography sx={labelStyle}>Item name</Typography>
//                   <Typography sx={valueStyle}>
//                     {publishedListItem.item_name}
//                   </Typography>
//                 </Grid>
//                 <Grid item display="flex" xs={12} md={6} gap={2}>
//                   <Typography sx={labelStyle}>Grade</Typography>
//                   <Typography sx={valueStyle}>{publishedListItem.grade}</Typography>
//                 </Grid>
//                 <Grid item display="flex" xs={12} md={6} gap={2}>
//                   <Typography sx={labelStyle}>Selling Rate</Typography>
//                   <Typography sx={valueStyle}>
//                     {publishedListItem.sale_rate}
//                   </Typography>
//                 </Grid>
//                 <Grid item display="flex" xs={12} md={6} gap={2}>
//                   <Typography sx={labelStyle}>Unit</Typography>
//                   <Typography sx={valueStyle}>
//                     {renderUnit({
//                       row: { unit: publishedListItem.unit },
//                       colors,
//                     })}
//                   </Typography>
//                 </Grid>
//                 <Grid item display="flex" xs={12} md={6} gap={2}>
//                   <Typography sx={labelStyle}>Order Quantity</Typography>
//                   <Autocomplete
//                     disableClearable
//                     options={purchaseQuantity}
//                     size="small"
//                     value={orderQuantity ?? ""}
//                     sx={{ width: 200 }}
//                     onChange={(e, value) => setOrderQuantity(value)}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Select order quantity"
//                         autoFocus
//                       />
//                     )}
//                     autoFocus
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 variant="contained"
//                 color="green"
//                 sx={{
//                   m: 2,
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//                 onClick={handlePlaceOrder}
//               >
//                 Buy
//               </Button>
//             </Card>
//           </div>
//         </Modal>
// }

// export default OrderUpdateModal