import Report from '../models/report.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Add Report Controller
const addReport = asyncHandler(async (req, res) => {
    try {
      const { problemType, problemDescription } = req.body;
      const { files } = req;
  
      
      if (!problemType || !problemDescription) {
        throw new ApiError(400, 'problemType and problemDescription are required fields');
      }
  
      let cloudinaryUrls = [];
  
      
      if (files && files.length > 0) {
        for (const file of files) {
          const cloudinaryResponse = await uploadOnCloudinary(file.path);
          cloudinaryUrls.push(cloudinaryResponse.url);
        }
      }
  
      
      const savedReport = await Report.create({
        problemType,
        problemDescription,
        problemAttachments: cloudinaryUrls,
        user:req.user._id
      });
  
      if(!savedReport){
        throw new ApiError(400,'something went wrong while saving report');
      }
  
      return res
      .status(201)
      .json(new ApiResponse(201, 'Report added successfully', savedReport));
    } catch (error) {
      console.log(error);
      throw new ApiError(400, 'Catch block of addReport executed');
    }
  });

// Delete Report Controller
const deleteReport = asyncHandler(async (req, res) => {
  try {
    const { reportId } = req.params;

    
    if (!reportId) {
      throw new ApiError(400, 'please provide reportId');
    }

    
    const report = await Report.findById(reportId);

   
    if (!report) {
      throw new ApiError(404, 'Report not found');
    }

    // Perform additional authorization or validation checks if needed

    
    const deletedReport = await Report.findByIdAndDelete(reportId);
    if(!deleteReport){
        throw new ApiError(400,"something went wrong while deleting report");
    }
    res
    .status(200)
    .json(new ApiResponse(200, 'Report deleted successfully', deletedReport));
  } catch (error) {
        console.log(error);
        throw new ApiError(400, 'Catch block of deleteReport executed');
  }
})

export {
    addReport,
    deleteReport
}